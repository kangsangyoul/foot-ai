'use client';

interface DraftDisplayProps {
  model: string;
  content: string;
  color: string;
}

export default function DraftDisplay({
  model,
  content,
  color,
}: DraftDisplayProps) {
  const colorMap: Record<string, string> = {
    'blue': 'border-blue-500 bg-blue-50',
    'green': 'border-green-500 bg-green-50',
    'purple': 'border-purple-500 bg-purple-50',
    'indigo': 'border-indigo-500 bg-indigo-50',
    'emerald': 'border-emerald-500 bg-emerald-50',
    'pink': 'border-pink-500 bg-pink-50',
    'orange': 'border-orange-500 bg-orange-50',
    'cyan': 'border-cyan-500 bg-cyan-50',
  };

  const colorClass = colorMap[color] || 'border-gray-500 bg-gray-50';

  return (
    <div className={`border-2 ${colorClass} rounded-lg p-6 shadow-sm`}>
      <h3 className="text-lg font-semibold mb-4">{model}</h3>
      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap text-gray-700">{content}</p>
      </div>
    </div>
  );
}
