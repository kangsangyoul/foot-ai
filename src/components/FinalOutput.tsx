'use client';

import { useState } from 'react';

interface FinalOutputProps {
  content: string;
}

export default function FinalOutput({ content }: FinalOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-2 border-yellow-500 rounded-lg p-6 bg-yellow-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>👣</span>
          <span>FINAL OUTPUT (FOOT AI)</span>
        </h3>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm font-medium"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap text-gray-800">{content}</p>
      </div>
    </div>
  );
}
