import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const isPublished = searchParams.get('isPublished');
    const isFeatured = searchParams.get('isFeatured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const sort = searchParams.get('sort') || 'publishedAt';

    const query: any = {};
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (isPublished !== null) query.isPublished = isPublished === 'true';
    if (isFeatured !== null) query.isFeatured = isFeatured === 'true';

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const sortObj: any = {};
    sortObj[sort] = -1;

    const posts = await Blog.find(query).sort(sortObj).limit(limit).skip(skip);
    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/blog error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      category,
      tags,
      metaTitle,
      metaDescription,
      isPublished,
      isFeatured,
      readTime,
      views,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const newBlog = new Blog({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      category,
      tags: tags || [],
      metaTitle,
      metaDescription,
      isPublished: isPublished ?? false,
      isFeatured: isFeatured ?? false,
      readTime,
      views: views ?? 0,
      publishedAt: isPublished ? new Date() : null,
    });

    const savedBlog = await newBlog.save();

    return NextResponse.json(
      { success: true, data: savedBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/blog error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
