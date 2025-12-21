'use client';

import { useReportStore } from '@/lib/store';
import { ReportSection } from '@/types';
import { generateId } from '@/lib/utils';
import { FiPlus, FiX, FiMove, FiType, FiImage, FiGrid, FiCheckSquare, FiRadio, FiTable, FiEdit3, FiMinus } from 'react-icons/fi';

const sectionTypes = [
  { type: 'title', label: 'عنوان', icon: FiType },
  { type: 'text', label: 'نص', icon: FiType },
  { type: 'header', label: 'رأس', icon: FiType },
  { type: 'table', label: 'جدول', icon: FiTable },
  { type: 'checkbox-group', label: 'خيارات متعددة', icon: FiCheckSquare },
  { type: 'radio-group', label: 'خيار واحد', icon: FiRadio },
  { type: 'form-field', label: 'حقول نموذج', icon: FiEdit3 },
  { type: 'signature', label: 'توقيعات', icon: FiEdit3 },
  { type: 'divider', label: 'فاصل', icon: FiMinus },
  { type: 'spacer', label: 'مسافة', icon: FiGrid },
];

export default function Sidebar() {
  const { currentDocument, addSection, deleteSection } = useReportStore();

  if (!currentDocument) return null;

  const handleAddSection = (type: ReportSection['type']) => {
    const newSection: ReportSection = {
      id: generateId(),
      type,
      content: type === 'title' ? 'عنوان جديد' : type === 'text' ? 'نص جديد' : '',
      styles: {
        alignment: 'right',
        fontSize: type === 'title' ? 18 : 12,
        fontWeight: type === 'title' ? 'bold' : 'normal',
        margin: { top: 10, bottom: 10 },
      },
    };
    addSection(newSection);
  };

  return (
    <div className="w-64 bg-white border-r shadow-sm p-4 overflow-auto">
      <h2 className="font-bold text-gray-900 mb-4">الأقسام</h2>

      {/* Add Section Buttons */}
      <div className="mb-6 space-y-2">
        <p className="text-sm text-gray-600 mb-2">إضافة قسم:</p>
        {sectionTypes.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => handleAddSection(type as ReportSection['type'])}
            className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-sm transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Sections List */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600 mb-2">الأقسام الحالية:</p>
        {currentDocument.sections.map((section, index) => (
          <div
            key={section.id}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">
                {section.type}
              </span>
              <button
                onClick={() => deleteSection(section.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 truncate">
              {section.content.substring(0, 30)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

