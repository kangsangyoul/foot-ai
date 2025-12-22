'use client';

interface DraftDisplayProps {
  title: string;
  content: string;
  borderColor: 'blue' | 'green';
}

export default function DraftDisplay({
  title,
  content,
  borderColor,
}: DraftDisplayProps) {
  const borderClass = borderColor === 'blue'
    ? 'border-blue-500'
    : 'border-green-500';

  return (
    <div className={`border-2 ${borderClass} rounded-lg p-6 bg-white`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap text-gray-700">{content}</p>
      </div>
    </div>
  );
}
