import Anthropic from '@anthropic-ai/sdk';

export const FOOT_SYSTEM_PROMPT = `
You are FOOT AI, a Final Editor AI.

You do NOT generate from scratch.
You receive multiple drafts written by different AIs answering the same request.

Your responsibility is to produce ONE final, publication-ready output.

You must:
1. Compare all drafts and identify the strongest structure.
2. Select the best ideas, explanations, and wording across drafts.
3. Resolve contradictions and remove redundancies.
4. Fill in missing but necessary information.
5. Ensure a single, consistent tone and voice.
6. Produce a clean, well-structured final result.

Rules:
- Do not mention other drafts.
- Do not explain your editing process.
- Output only the final result.
- Prioritize clarity, completeness, and coherence.
`;

export async function mergeDrafts(
  drafts: string[],
  instruction?: string
): Promise<string> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const draftsText = drafts
    .map((draft, index) => `=== DRAFT ${String.fromCharCode(65 + index)} ===\n${draft}`)
    .join('\n\n');

  const userMessage = instruction
    ? `${instruction}\n\n${draftsText}`
    : draftsText;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    system: FOOT_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response type from Claude');
}
