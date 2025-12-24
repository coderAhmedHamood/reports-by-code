'use client';

import { useReportStore } from '@/lib/store';

export default function SignatureSection() {
  const { currentDocument } = useReportStore();

  if (!currentDocument) return null;

  const data = currentDocument.data;

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      {/* Technician */}
      <div>
        <div className="bg-[#7dd3fc] text-white py-2.5 px-4 mb-3">
          <h3 className="text-center font-bold text-sm">
            Technician / الفني
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1.5">
              Name / الاسم:
            </label>
            <div className="border-b border-gray-400 pb-1 min-h-[18px] text-xs text-gray-700">
              {data.technician_name || ''}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1.5">
              Signature / التوقيع:
            </label>
            <div className="border-b border-gray-400 pb-1 min-h-[18px] text-xs text-gray-700">
              {data.technician_signature || ''}
            </div>
          </div>
          <div className="text-xs text-gray-600">
            Tel: 920004107
          </div>
        </div>
      </div>

      {/* Customer */}
      <div>
        <div className="bg-[#7dd3fc] text-white py-2.5 px-4 mb-3">
          <h3 className="text-center font-bold text-sm">
            Customer / العميل
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1.5">
              Name / الاسم:
            </label>
            <div className="border-b border-gray-400 pb-1 min-h-[18px] text-xs text-gray-700">
              {data.customer_name_signature || ''}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1.5">
              Signature / التوقيع:
            </label>
            <div className="border-b border-gray-400 pb-1 min-h-[18px] text-xs text-gray-700">
              {data.customer_signature || ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

