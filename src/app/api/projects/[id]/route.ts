import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
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

    let project;

    if (isValidObjectId(params.id)) {
      project = await Project.findById(params.id);
    } else {
      project = await Project.findOne({ slug: params.id });
    }

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
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
    let project;

    if (isValidObjectId(params.id)) {
      project = await Project.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
      });
    } else {
      project = await Project.findOneAndUpdate({ slug: params.id }, body, {
        new: true,
        runValidators: true,
      });
    }

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('PUT /api/projects/[id] error:', error);
    const errorMessage =
      error instanceof mongoose.Error.ValidationError
        ? Object.values(error.errors)
            .map((err: any) => err.message)
            .join(', ')
        : error instanceof Error
        ? error.message
        : 'Failed to update project';
    return NextResponse.json(
      { success: false, error: errorMessage },
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

    let project;

    if (isValidObjectId(params.id)) {
      project = await Project.findByIdAndDelete(params.id);
    } else {
      project = await Project.findOneAndDelete({ slug: params.id });
    }

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('DELETE /api/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
