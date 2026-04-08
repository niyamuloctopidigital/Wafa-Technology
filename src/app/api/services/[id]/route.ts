import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
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

    let service;

    if (isValidObjectId(params.id)) {
      service = await Service.findById(params.id);
    } else {
      service = await Service.findOne({ slug: params.id });
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('GET /api/services/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service' },
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
    const {
      iconName,
      icon,
      thumbnailUrl,
      thumbnail,
      bannerImageUrl,
      bannerImage,
      ...rest
    } = body;

    const mergedBody = {
      ...rest,
      icon: icon || iconName,
      thumbnail: thumbnail || thumbnailUrl,
      bannerImage: bannerImage || bannerImageUrl,
    };

    let service;

    if (isValidObjectId(params.id)) {
      service = await Service.findByIdAndUpdate(params.id, mergedBody, {
        new: true,
        runValidators: true,
      });
    } else {
      service = await Service.findOneAndUpdate({ slug: params.id }, mergedBody, {
        new: true,
        runValidators: true,
      });
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('PUT /api/services/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
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

    let service;

    if (isValidObjectId(params.id)) {
      service = await Service.findByIdAndDelete(params.id);
    } else {
      service = await Service.findOneAndDelete({ slug: params.id });
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('DELETE /api/services/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
