import { NextRequest, NextResponse } from 'next/server';
import { mergeDrafts } from '@/lib/footEditor';

export async function POST(request: NextRequest) {
  try {
    const { drafts, instruction } = await request.json();

    if (!drafts || !Array.isArray(drafts) || drafts.length === 0) {
      return NextResponse.json(
        { error: 'Drafts array is required and must not be empty' },
        { status: 400 }
      );
    }

    const final = await mergeDrafts(drafts, instruction);

    return NextResponse.json({ final });
  } catch (error) {
    console.error('Error merging drafts:', error);
    return NextResponse.json(
      { error: 'Failed to merge drafts. Please check your API keys and try again.' },
      { status: 500 }
    );
  }
}
