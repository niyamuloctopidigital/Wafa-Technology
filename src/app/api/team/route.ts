import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Team from '@/models/Team';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('isActive');
    const isLeader = searchParams.get('isLeader');
    const department = searchParams.get('department');

    const query: any = {};
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    if (isLeader !== null) {
      query.isLeader = isLeader === 'true';
    }
    if (department) {
      query.department = department;
    }

    const team = await Team.find(query).sort({ order: 1 });

    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error('GET /api/team error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
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
    const { name, role, bio, image, email, department, isLeader, linkedin, twitter, github, order, isActive } = body;

    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: 'Name and role are required' },
        { status: 400 }
      );
    }

    const newTeam = new Team({
      name,
      role,
      bio,
      image,
      email,
      department,
      isLeader: isLeader ?? false,
      linkedin,
      twitter,
      github,
      order: order ?? 0,
      isActive: isActive ?? true,
    });

    const savedTeam = await newTeam.save();

    return NextResponse.json(
      { success: true, data: savedTeam },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/team error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
