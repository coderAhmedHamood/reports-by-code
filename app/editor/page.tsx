'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReportStore } from '@/lib/store';
import EditorLayout from '@/components/EditorLayout';

export default function EditorPage() {
  const router = useRouter();
  const { currentDocument } = useReportStore();

  useEffect(() => {
    if (!currentDocument) {
      router.push('/');
    }
  }, [currentDocument, router]);

  if (!currentDocument) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  return <EditorLayout />;
}

