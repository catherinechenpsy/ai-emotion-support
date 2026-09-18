import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI情绪支持研究',
  description: 'AI社会角色与情绪调节策略顺序研究',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
