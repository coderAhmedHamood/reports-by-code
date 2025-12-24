'use client';

import { useReportStore } from '@/lib/store';

export default function CustomerInformationSection() {
  const { currentDocument } = useReportStore();

  if (!currentDocument) return null;

  const data = currentDocument.data;

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="bg-[#14b8a6] text-white py-3 px-4 mb-4">
        <h3 className="text-center font-bold text-base">
          Customer's Information / معلومات العميل
        </h3>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left Column - Customer Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name / الاسم:
            </label>
            <div className="border-b-2 border-gray-300 pb-1 min-h-[20px]">
              {data.customer_name || ''}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address / العنوان:
            </label>
            <div className="border-b-2 border-gray-300 pb-1 min-h-[20px]">
              {data.customer_address || ''}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contract / العقد / Job No / رقم العميل:
            </label>
            <div className="border-b-2 border-gray-300 pb-1 min-h-[20px]">
              {data.job_number || ''}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Treated Areas / مناطق المعالجة:
            </label>
            <div className="border-b-2 border-gray-300 pb-1 min-h-[20px]">
              {data.treated_areas || ''}
            </div>
          </div>
        </div>

        {/* Right Column - Treatment Type */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#7dd3fc] rotate-45"></div>
            <h4 className="text-sm font-bold text-gray-800">
              Treatment Type / نوع المعالجة
            </h4>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="treatment_type"
                value="routine"
                checked={data.treatment_type === 'routine'}
                readOnly
                className="w-4 h-4 text-[#14b8a6] border-gray-300"
              />
              <span className="text-sm text-gray-700">Routine / دوري</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="treatment_type"
                value="follow-up"
                checked={data.treatment_type === 'follow-up'}
                readOnly
                className="w-4 h-4 text-[#14b8a6] border-gray-300"
              />
              <span className="text-sm text-gray-700">Follow-Up / مراجعة</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="treatment_type"
                value="call-out"
                checked={data.treatment_type === 'call-out'}
                readOnly
                className="w-4 h-4 text-[#14b8a6] border-gray-300"
              />
              <span className="text-sm text-gray-700">Call-Out / مكالمة صادرة</span>
            </label>
          </div>
        </div>
      </div>

      {/* Table Section Header */}
      <div className="bg-[#14b8a6] text-white py-3 px-4 mb-3 mt-6">
        <h3 className="text-center font-bold text-base">
          Customer's Information / معلومات العميل
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-white">
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-800">
                Pests / الآفات
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-800">
                <div className="flex items-center justify-end gap-1">
                  <div className="w-1.5 h-1.5 bg-[#7dd3fc] rotate-45"></div>
                  <span>Level of Activity / مستوى النشاط</span>
                </div>
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-800">
                Treatment/Control / المعالجة/التحكم
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-800">
                Materials Used / الأدوات التي تم استخدامها
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-800">
                Qty / العدد
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-800">
                Units / الوحدات
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => {
              const rowData = data.pests_data?.[idx] || [];
              return (
                <tr key={idx}>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {rowData[0] || ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {rowData[1] || ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {rowData[2] || ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {rowData[3] || ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {rowData[4] || ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {rowData[5] || ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

