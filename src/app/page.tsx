'use client';

import { useState } from 'react';
import PromptInput from '@/components/PromptInput';
import DraftDisplay from '@/components/DraftDisplay';
import FinalOutput from '@/components/FinalOutput';

interface Draft {
  model: string;
  content: string;
  color: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [final, setFinal] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setDrafts([]);
    setFinal('');

    try {
      // Step 1: Generate drafts from all AIs
      const draftsResponse = await fetch('/api/writers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!draftsResponse.ok) {
        const errorData = await draftsResponse.json();
        throw new Error(errorData.error || 'Failed to generate drafts');
      }

      const { drafts: newDrafts } = await draftsResponse.json();
      setDrafts(newDrafts);

      // Step 2: Merge drafts using FOOT AI
      setIsMerging(true);
      const editorResponse = await fetch('/api/editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drafts: newDrafts.map((d: Draft) => d.content),
        }),
      });

      if (!editorResponse.ok) {
        throw new Error('Failed to merge drafts');
      }

      const { final: newFinal } = await editorResponse.json();
      setFinal(newFinal);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setIsMerging(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <span>👣</span>
            <span>FOOT AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Final Output Optimization Tool
          </p>
          <p className="text-md text-gray-500">
            모든 주요 AI 모델을 융합한 최강의 답변 생성기
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Claude</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">GPT-4</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Gemini</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Mistral</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">Cohere</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">Llama</span>
          </div>
        </div>

        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onGenerate={handleGenerate}
          isLoading={isLoading || isMerging}
        />

        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading && !drafts.length && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 text-lg">
              {drafts.length === 0 ? '모든 AI 모델에 요청 중...' : `${drafts.length}개 모델 응답 완료...`}
            </p>
          </div>
        )}

        {drafts.length > 0 && (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {drafts.length}개 AI 모델의 답변
              </h2>
              <p className="text-gray-600 mt-2">각 AI가 생성한 독립적인 답변들</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drafts.map((draft, index) => (
                <DraftDisplay
                  key={index}
                  model={draft.model}
                  content={draft.content}
                  color={draft.color}
                />
              ))}
            </div>

            {isMerging && !final && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
                <p className="mt-4 text-gray-600 text-lg font-semibold">
                  👣 FOOT AI가 {drafts.length}개의 답변을 분석하고 병합하는 중...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  최고의 아이디어와 설명을 선택하고 있습니다
                </p>
              </div>
            )}

            {final && (
              <div className="mt-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    최종 융합 결과
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {drafts.length}개 AI의 장점을 모두 결합한 최적의 답변
                  </p>
                </div>
                <FinalOutput content={final} />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
