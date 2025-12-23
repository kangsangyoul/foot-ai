import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CohereClient } from 'cohere-ai';
import Mistral from '@mistralai/mistralai';
import Replicate from 'replicate';

export interface Draft {
  model: string;
  content: string;
  color: string;
}

// Claude 3.5 Sonnet
export async function generateWithClaude(prompt: string): Promise<Draft> {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    return {
      model: 'Claude 3.5 Sonnet',
      content: content.type === 'text' ? content.text : '',
      color: 'blue',
    };
  } catch (error) {
    console.error('Claude error:', error);
    return {
      model: 'Claude 3.5 Sonnet',
      content: 'Error: Unable to generate response',
      color: 'blue',
    };
  }
}

// Claude Opus (더 강력한 버전)
export async function generateWithClaudeOpus(prompt: string): Promise<Draft> {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    return {
      model: 'Claude Opus 4',
      content: content.type === 'text' ? content.text : '',
      color: 'indigo',
    };
  } catch (error) {
    console.error('Claude Opus error:', error);
    return {
      model: 'Claude Opus 4',
      content: 'Error: Unable to generate response',
      color: 'indigo',
    };
  }
}

// GPT-4
export async function generateWithGPT4(prompt: string): Promise<Draft> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4096,
    });

    return {
      model: 'GPT-4 Turbo',
      content: completion.choices[0]?.message?.content || 'No response',
      color: 'green',
    };
  } catch (error) {
    console.error('GPT-4 error:', error);
    return {
      model: 'GPT-4 Turbo',
      content: 'Error: Unable to generate response',
      color: 'green',
    };
  }
}

// GPT-4o (최신 버전)
export async function generateWithGPT4o(prompt: string): Promise<Draft> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4096,
    });

    return {
      model: 'GPT-4o',
      content: completion.choices[0]?.message?.content || 'No response',
      color: 'emerald',
    };
  } catch (error) {
    console.error('GPT-4o error:', error);
    return {
      model: 'GPT-4o',
      content: 'Error: Unable to generate response',
      color: 'emerald',
    };
  }
}

// Google Gemini Pro
export async function generateWithGemini(prompt: string): Promise<Draft> {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return {
      model: 'Gemini Pro',
      content: response.text(),
      color: 'purple',
    };
  } catch (error) {
    console.error('Gemini error:', error);
    return {
      model: 'Gemini Pro',
      content: 'Error: Unable to generate response (API key may be missing)',
      color: 'purple',
    };
  }
}

// Cohere Command
export async function generateWithCohere(prompt: string): Promise<Draft> {
  try {
    if (!process.env.COHERE_API_KEY) {
      throw new Error('COHERE_API_KEY not configured');
    }

    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });

    const response = await cohere.generate({
      model: 'command',
      prompt: prompt,
      maxTokens: 4096,
    });

    return {
      model: 'Cohere Command',
      content: response.generations[0]?.text || 'No response',
      color: 'pink',
    };
  } catch (error) {
    console.error('Cohere error:', error);
    return {
      model: 'Cohere Command',
      content: 'Error: Unable to generate response (API key may be missing)',
      color: 'pink',
    };
  }
}

// Mistral Large
export async function generateWithMistral(prompt: string): Promise<Draft> {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY not configured');
    }

    const client = new Mistral({
      apiKey: process.env.MISTRAL_API_KEY,
    });

    const response = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 4096,
    });

    return {
      model: 'Mistral Large',
      content: response.choices?.[0]?.message?.content || 'No response',
      color: 'orange',
    };
  } catch (error) {
    console.error('Mistral error:', error);
    return {
      model: 'Mistral Large',
      content: 'Error: Unable to generate response (API key may be missing)',
      color: 'orange',
    };
  }
}

// Llama 3 (via Replicate)
export async function generateWithLlama(prompt: string): Promise<Draft> {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN not configured');
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      'meta/meta-llama-3-70b-instruct',
      {
        input: {
          prompt: prompt,
          max_tokens: 4096,
        },
      }
    ) as string[];

    return {
      model: 'Llama 3 70B',
      content: Array.isArray(output) ? output.join('') : String(output),
      color: 'cyan',
    };
  } catch (error) {
    console.error('Llama error:', error);
    return {
      model: 'Llama 3 70B',
      content: 'Error: Unable to generate response (API key may be missing)',
      color: 'cyan',
    };
  }
}

// 모든 AI 모델로 생성
export async function generateAllDrafts(prompt: string): Promise<Draft[]> {
  // 병렬로 모든 AI 호출
  const results = await Promise.allSettled([
    generateWithClaude(prompt),
    generateWithClaudeOpus(prompt),
    generateWithGPT4(prompt),
    generateWithGPT4o(prompt),
    generateWithGemini(prompt),
    generateWithCohere(prompt),
    generateWithMistral(prompt),
    generateWithLlama(prompt),
  ]);

  // 성공한 결과만 반환
  return results
    .filter((result): result is PromiseFulfilledResult<Draft> => result.status === 'fulfilled')
    .map(result => result.value)
    .filter(draft => !draft.content.includes('Error')); // 에러가 없는 것만
}

// 특정 AI들만 선택해서 생성
export async function generateSelectedDrafts(
  prompt: string,
  models: string[]
): Promise<Draft[]> {
  const modelMap: Record<string, () => Promise<Draft>> = {
    'claude': () => generateWithClaude(prompt),
    'claude-opus': () => generateWithClaudeOpus(prompt),
    'gpt4': () => generateWithGPT4(prompt),
    'gpt4o': () => generateWithGPT4o(prompt),
    'gemini': () => generateWithGemini(prompt),
    'cohere': () => generateWithCohere(prompt),
    'mistral': () => generateWithMistral(prompt),
    'llama': () => generateWithLlama(prompt),
  };

  const selectedGenerators = models
    .filter(model => modelMap[model])
    .map(model => modelMap[model]());

  const results = await Promise.allSettled(selectedGenerators);

  return results
    .filter((result): result is PromiseFulfilledResult<Draft> => result.status === 'fulfilled')
    .map(result => result.value);
}
