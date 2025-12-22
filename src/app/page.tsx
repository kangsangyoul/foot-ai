'use client';

import { useState } from 'react';
import PromptInput from '@/components/PromptInput';
import DraftDisplay from '@/components/DraftDisplay';
import FinalOutput from '@/components/FinalOutput';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [draftA, setDraftA] = useState('');
  const [draftB, setDraftB] = useState('');
  const [final, setFinal] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setDraftA('');
    setDraftB('');
    setFinal('');

    try {
      // Step 1: Generate drafts from both AIs
      const draftsResponse = await fetch('/api/writers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!draftsResponse.ok) {
        throw new Error('Failed to generate drafts');
      }

      const { draftA: newDraftA, draftB: newDraftB } = await draftsResponse.json();
      setDraftA(newDraftA);
      setDraftB(newDraftB);

      // Step 2: Merge drafts using FOOT AI
      setIsMerging(true);
      const editorResponse = await fetch('/api/editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drafts: [newDraftA, newDraftB] }),
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
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <span>👣</span>
            <span>FOOT AI</span>
          </h1>
          <p className="text-lg text-gray-600">
            Final Output Optimization Tool - Merging the best of Claude & GPT-4
          </p>
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

        {(draftA || draftB || final) && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {draftA && (
                <DraftDisplay
                  title="Draft A (Claude)"
                  content={draftA}
                  borderColor="blue"
                />
              )}
              {draftB && (
                <DraftDisplay
                  title="Draft B (GPT-4)"
                  content={draftB}
                  borderColor="green"
                />
              )}
            </div>

            {isMerging && !final && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                <p className="mt-4 text-gray-600">FOOT AI is merging drafts...</p>
              </div>
            )}

            {final && <FinalOutput content={final} />}
          </div>
        )}
      </div>
    </main>
  );
}
