import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Resume from '@/models/Resume';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await Resume.find({ user: session.userId }).sort({ updatedAt: -1 });
    return NextResponse.json(resumes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const resume = await Resume.create({
      ...data,
      user: session.userId,
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
