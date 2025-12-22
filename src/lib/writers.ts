import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export async function generateWithClaude(prompt: string): Promise<string> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response type from Claude');
}

export async function generateWithGPT4(prompt: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 4096,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from GPT-4');
  }

  return content;
}

export async function generateDrafts(prompt: string): Promise<{
  draftA: string;
  draftB: string;
}> {
  const [draftA, draftB] = await Promise.all([
    generateWithClaude(prompt),
    generateWithGPT4(prompt),
  ]);

  return { draftA, draftB };
}
