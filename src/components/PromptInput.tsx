'use client';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function PromptInput({
  value,
  onChange,
  onGenerate,
  isLoading,
}: PromptInputProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
        Enter your prompt
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask anything... (e.g., 'Explain quantum computing in simple terms')"
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !value.trim()}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Generating...' : 'Generate Drafts'}
      </button>
    </div>
  );
}
