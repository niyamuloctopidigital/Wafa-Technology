import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import nodemailer from 'nodemailer';

const rateLimit = new Map<string, number>();

const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const lastSubmit = rateLimit.get(email);

  if (!lastSubmit) {
    rateLimit.set(email, now);
    return false;
  }

  if (now - lastSubmit < RATE_LIMIT_WINDOW) {
    return true;
  }

  rateLimit.set(email, now);
  return false;
}

async function sendEmailNotification(leadData: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <h2>New Lead from Website</h2>
      <p><strong>Name:</strong> ${leadData.name}</p>
      <p><strong>Email:</strong> ${leadData.email}</p>
      ${leadData.phone ? `<p><strong>Phone:</strong> ${leadData.phone}</p>` : ''}
      ${leadData.company ? `<p><strong>Company:</strong> ${leadData.company}</p>` : ''}
      ${leadData.service ? `<p><strong>Service Interested:</strong> ${leadData.service}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${leadData.message.replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `New Lead: ${leadData.name}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Check rate limiting
    if (isRateLimited(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please wait 5 minutes before submitting another message',
        },
        { status: 429 }
      );
    }

    await dbConnect();

    const newLead = new Lead({
      name,
      email,
      phone,
      company,
      service,
      message,
      status: 'new',
      source: 'website',
    });

    const savedLead = await newLead.save();

    // Send email notification
    await sendEmailNotification(savedLead.toObject());

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
        data: {
          id: savedLead._id,
          email: savedLead.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
