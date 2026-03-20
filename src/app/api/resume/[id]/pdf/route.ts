import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Resume from '@/models/Resume';
import { getSession } from '@/lib/session';
import { renderToStream } from '@react-pdf/renderer';
import { ResumePDF } from '@/components/ResumePDF';
import React from 'react';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = await Resume.findOne({ _id: id, user: session.userId });
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const stream = await renderToStream(React.createElement(ResumePDF, { data: resume }) as any);
    
    // Convert stream to response
    const response = new NextResponse(stream as any);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', `attachment; filename="${resume.name.replace(/\s+/g, '_')}.pdf"`);

    return response;
  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
