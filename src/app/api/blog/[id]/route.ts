import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { authOptions } from '@/lib/auth';
import { Types } from 'mongoose';

export const dynamic = 'force-dynamic';

function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    let post;

    if (isValidObjectId(params.id)) {
      post = await Blog.findByIdAndUpdate(
        params.id,
        { $inc: { views: 1 } },
        { new: true }
      );
    } else {
      post = await Blog.findOne({ slug: params.id });
      if (post) {
        post = await Blog.findByIdAndUpdate(
          post._id,
          { $inc: { views: 1 } },
          { new: true }
        );
      }
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('GET /api/blog/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    let post;

    if (isValidObjectId(params.id)) {
      post = await Blog.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
      });
    } else {
      post = await Blog.findOneAndUpdate({ slug: params.id }, body, {
        new: true,
        runValidators: true,
      });
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('PUT /api/blog/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    let post;

    if (isValidObjectId(params.id)) {
      post = await Blog.findByIdAndDelete(params.id);
    } else {
      post = await Blog.findOneAndDelete({ slug: params.id });
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('DELETE /api/blog/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
