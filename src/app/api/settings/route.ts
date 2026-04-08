import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const settings = await Settings.findOne().lean();
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error('GET /api/settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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

    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      {
        siteName: body.siteName,
        siteDescription: body.siteDescription,
        contactEmail: body.contactEmail,
        phoneNumber: body.phoneNumber,
        address: body.address,
        socialLinks: {
          twitter: body.socialLinks?.twitter,
          linkedin: body.socialLinks?.linkedin,
          github: body.socialLinks?.github,
          facebook: body.socialLinks?.facebook,
          instagram: body.socialLinks?.instagram,
        },
        calendarLink: body.calendarLink,
        calendarEmbedCode: body.calendarEmbedCode,
        analytics: {
          googleAnalyticsId: body.analytics?.googleAnalyticsId,
          metaPixelId: body.analytics?.metaPixelId,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error) {
    console.error('PUT /api/settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
