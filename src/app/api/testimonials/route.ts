import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
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

    const testimonials = await Testimonial.find(query).sort({ order: 1 });

    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('GET /api/testimonials error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
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
    const { quote, author, role, company, initials, rating, order, isActive } = body;

    if (!quote || !author || !role) {
      return NextResponse.json(
        { success: false, error: 'Quote, author, and role are required' },
        { status: 400 }
      );
    }

    const autoInitials = initials || author.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

    const newTestimonial = new Testimonial({
      quote,
      author,
      role,
      company: company || '',
      initials: autoInitials,
      rating: rating ?? 5,
      order: order ?? 0,
      isActive: isActive ?? true,
    });

    const saved = await newTestimonial.save();

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error('POST /api/testimonials error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
