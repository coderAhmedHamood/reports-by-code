'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReportStore } from '@/lib/store';
import Sidebar from './Sidebar';
import PreviewPanel from './PreviewPanel';
import DataInputPanel from './DataInputPanel';
import SectionEditor from './SectionEditor';
import { FiDownload, FiEye, FiEyeOff } from 'react-icons/fi';
import { downloadPDF } from '@/lib/pdfGenerator';

export default function EditorLayout() {
  const router = useRouter();
  const { currentDocument, previewMode, setPreviewMode } = useReportStore();
  const [activeTab, setActiveTab] = useState<'edit' | 'data'>('edit');

  if (!currentDocument) return null;

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      
      // البحث عن عنصر المعاينة
      const previewElement = document.querySelector('[data-preview-container]') as HTMLElement;
      
      if (!previewElement) {
        alert('لم يتم العثور على عنصر المعاينة');
        setIsGenerating(false);
        return;
      }

      // استخدام html2canvas مباشرة
      const { generatePDFFromElement } = await import('@/lib/pdfGenerator');
      await generatePDFFromElement(previewElement, `${currentDocument.name}.pdf`);
      
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('حدث خطأ أثناء إنشاء PDF: ' + (error as Error).message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← الرجوع
            </button>
            <h1 className="text-xl font-bold text-gray-900">{currentDocument.name}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
            >
              {previewMode ? (
                <>
                  <FiEyeOff className="w-4 h-4" />
                  إخفاء المعاينة
                </>
              ) : (
                <>
                  <FiEye className="w-4 h-4" />
                  معاينة
                </>
              )}
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              {isGenerating ? 'جاري التصدير...' : 'تصدير PDF'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center: Preview */}
        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <PreviewPanel />
        </div>

        {/* Right Panel: Edit/Data */}
        <div className="w-80 bg-white border-l shadow-lg">
          <div className="border-b flex">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
                activeTab === 'edit'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              التحرير
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
                activeTab === 'data'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              البيانات
            </button>
          </div>

          <div className="p-4 overflow-auto h-full">
            {activeTab === 'edit' ? (
              <SectionEditor />
            ) : (
              <DataInputPanel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

