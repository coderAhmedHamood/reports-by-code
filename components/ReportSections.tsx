'use client';

import { useReportStore } from '@/lib/store';

export default function ReportSections() {
  const { currentDocument } = useReportStore();

  if (!currentDocument) return null;

  const data = currentDocument.data;

  // تقسيم النص إلى أسطر
  const treatmentReportLines = (data.treatment_report_details || '').split('\n').slice(0, 5);
  const recommendationsLines = (data.recommended_improvements || '').split('\n').slice(0, 5);

  return (
    <div className="mb-6 space-y-5">
      {/* Treatment Report */}
      <div>
        <div className="bg-[#14b8a6] text-white py-2.5 px-4 mb-3">
          <h3 className="text-center font-bold text-sm">
            Treatment Report / تقرير المعالجة
          </h3>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="border-b border-gray-400 pb-1 min-h-[20px] text-xs text-gray-700"
            >
              {treatmentReportLines[idx] || ''}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Improvements */}
      <div>
        <div className="bg-[#14b8a6] text-white py-2.5 px-4 mb-3">
          <h3 className="text-center font-bold text-sm">
            Recommended Improvements / التوصية بالتحسينات
          </h3>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="border-b border-gray-400 pb-1 min-h-[20px] text-xs text-gray-700"
            >
              {recommendationsLines[idx] || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

