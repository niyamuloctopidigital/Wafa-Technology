import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const isFeatured = searchParams.get('isFeatured');
    const isActive = searchParams.get('isActive');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const query: any = {};
    if (category) query.category = category;
    if (isFeatured !== null) query.isFeatured = isFeatured === 'true';
    if (isActive !== null) query.isActive = isActive === 'true';

    const skip = (page - 1) * limit;

    const projects = await Project.find(query).limit(limit).skip(skip);
    const total = await Project.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
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
      description,
      longDescription,
      category,
      technologies,
      thumbnail,
      images,
      clientName,
      projectUrl,
      isFeatured,
      isActive,
      completedAt,
    } = body;

    if (!title || !slug || !category || !thumbnail) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and thumbnail are required' },
        { status: 400 }
      );
    }

    const newProject = new Project({
      title,
      slug,
      description,
      longDescription,
      category,
      technologies: technologies || [],
      thumbnail,
      images: images || [],
      clientName,
      projectUrl,
      isFeatured: isFeatured ?? false,
      isActive: isActive ?? true,
      completedAt,
    });

    const savedProject = await newProject.save();

    return NextResponse.json(
      { success: true, data: savedProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/projects error:', error);
    const errorMessage =
      error instanceof mongoose.Error.ValidationError
        ? Object.values(error.errors)
            .map((err: any) => err.message)
            .join(', ')
        : error instanceof Error
        ? error.message
        : 'Failed to create project';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
