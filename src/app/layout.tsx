import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FOOT AI - Final Output Optimization Tool',
  description: 'Merging the best of Claude & GPT-4 for superior AI-generated content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
