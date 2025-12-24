'use client';

import { useReportStore } from '@/lib/store';

export default function ActivityAndRisksSection() {
  const { currentDocument } = useReportStore();

  if (!currentDocument) return null;

  const data = currentDocument.data;

  return (
    <div className="mb-6">
      {/* Level of Activity */}
      <div className="mb-5">
        <div className="bg-[#7dd3fc] text-white py-2.5 px-4 mb-3">
          <h3 className="text-center font-bold text-sm">
            Level of Activity / مستوى النشاط
          </h3>
        </div>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="activity_level"
              value="preventative"
              checked={data.activity_level === 'preventative'}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400"
            />
            <span className="text-xs text-gray-800">P = Preventative / الوقاية</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="activity_level"
              value="low"
              checked={data.activity_level === 'low'}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400"
            />
            <span className="text-xs text-gray-800">L = Low / منخفض</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="activity_level"
              value="medium"
              checked={data.activity_level === 'medium'}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400"
            />
            <span className="text-xs text-gray-800">M = Medium / متوسط</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="activity_level"
              value="high"
              checked={data.activity_level === 'high'}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400"
            />
            <span className="text-xs text-gray-800">High / عالي</span>
          </label>
        </div>
      </div>

      {/* Pest Risks Found */}
      <div className="mb-5">
        <div className="bg-[#14b8a6] text-white py-2.5 px-4 mb-3">
          <h3 className="text-center font-bold text-sm">
            Pest Risks Found / مخاطر الآفات التي تم اكتشافها
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('stock_damage')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Stock Damage / تلف المخزون</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('contamination')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Contamination / تلوث</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('legal_action')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Legal Action / اجراءات قانونية</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('reputation')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Reputation / سمعة</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('building_damage')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Building Damage / تلف المبنى</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('safety_welfare')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Safety/Welfare / السلامة / الرعاية</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('disease_risks')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Disease Risks / مخاطر الأمراض</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.pest_risks || []).includes('other')}
              readOnly
              className="w-4 h-4 text-[#14b8a6] border-gray-400 rounded"
            />
            <span className="text-xs text-gray-800">Other / أخرى</span>
          </label>
        </div>
      </div>
    </div>
  );
}

