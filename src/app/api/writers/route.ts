import { NextRequest, NextResponse } from 'next/server';
import { generateAllDrafts } from '@/lib/writers';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const drafts = await generateAllDrafts(prompt);

    if (drafts.length === 0) {
      return NextResponse.json(
        { error: 'No AI models were able to generate responses. Please check your API keys.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ drafts });
  } catch (error) {
    console.error('Error generating drafts:', error);
    return NextResponse.json(
      { error: 'Failed to generate drafts. Please check your API keys and try again.' },
      { status: 500 }
    );
  }
}
