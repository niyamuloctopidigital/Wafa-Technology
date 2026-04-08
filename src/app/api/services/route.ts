import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('isActive');

    const query: any = {};
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }

    const services = await Service.find(query).sort({ order: 1 });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('GET /api/services error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
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
      shortDescription,
      longDescription,
      icon,
      iconName,
      features,
      technologies,
      thumbnail,
      thumbnailUrl,
      bannerImage,
      bannerImageUrl,
      metaTitle,
      metaDescription,
      order,
      isActive,
    } = body;

    const serviceIcon = icon || iconName;
    const serviceThumbnail = thumbnail || thumbnailUrl;
    const serviceBannerImage = bannerImage || bannerImageUrl;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const newService = new Service({
      title,
      slug,
      shortDescription,
      longDescription,
      icon: serviceIcon,
      features: features || [],
      technologies: technologies || [],
      thumbnail: serviceThumbnail,
      bannerImage: serviceBannerImage,
      metaTitle,
      metaDescription,
      order: order ?? 0,
      isActive: isActive ?? true,
    });

    const savedService = await newService.save();

    return NextResponse.json(
      { success: true, data: savedService },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/services error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create service';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
