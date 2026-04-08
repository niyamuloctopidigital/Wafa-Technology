import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Team from '@/models/Team';
import Blog from '@/models/Blog';
import Lead from '@/models/Lead';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const [projects, teamMembers, blogPosts, newLeads] = await Promise.all([
      Project.countDocuments(),
      Team.countDocuments(),
      Blog.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
    ]);

    return NextResponse.json({
      success: true,
      projects,
      teamMembers,
      blogPosts,
      newLeads,
    });
  } catch (error) {
    console.error('GET /api/dashboard/stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load dashboard stats' },
      { status: 500 }
    );
  }
}
