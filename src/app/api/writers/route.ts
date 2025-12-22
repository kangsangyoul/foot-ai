import { NextRequest, NextResponse } from 'next/server';
import { generateDrafts } from '@/lib/writers';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const { draftA, draftB } = await generateDrafts(prompt);

    return NextResponse.json({ draftA, draftB });
  } catch (error) {
    console.error('Error generating drafts:', error);
    return NextResponse.json(
      { error: 'Failed to generate drafts. Please check your API keys and try again.' },
      { status: 500 }
    );
  }
}
