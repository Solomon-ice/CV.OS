import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const user = await User.findById(session.userId).select('-password');
    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
