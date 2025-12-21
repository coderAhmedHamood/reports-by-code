'use client';

import { useEffect, useState } from 'react';
import { useReportStore } from '@/lib/store';
import { ReportSection } from '@/types';
import { FiAlignLeft, FiAlignCenter, FiAlignRight, FiAlignJustify } from 'react-icons/fi';

export default function SectionEditor() {
  const { currentDocument, selectedSection, updateSection } = useReportStore();
  const [section, setSection] = useState<ReportSection | null>(null);

  useEffect(() => {
    if (currentDocument && selectedSection) {
      const found = currentDocument.sections.find((s) => s.id === selectedSection);
      setSection(found || null);
    } else {
      setSection(null);
    }
  }, [currentDocument, selectedSection]);

  if (!section) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>اختر قسمًا من المعاينة لتعديله</p>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<ReportSection>) => {
    if (selectedSection) {
      updateSection(selectedSection, updates);
      setSection({ ...section, ...updates });
    }
  };

  const alignmentOptions = [
    { value: 'right', icon: FiAlignRight, label: 'يمين' },
    { value: 'left', icon: FiAlignLeft, label: 'يسار' },
    { value: 'center', icon: FiAlignCenter, label: 'وسط' },
    { value: 'justify', icon: FiAlignJustify, label: 'موزع' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-900 mb-2">تعديل القسم</h3>
        <p className="text-sm text-gray-600 mb-4">نوع: {section.type}</p>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          المحتوى
        </label>
        {section.type === 'text' || section.type === 'title' || section.type === 'header' ? (
          <textarea
            value={section.content}
            onChange={(e) => handleUpdate({ content: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={section.type === 'text' ? 6 : 3}
          />
        ) : (
          <input
            type="text"
            value={section.content}
            onChange={(e) => handleUpdate({ content: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}
      </div>

      {/* Data Binding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ربط البيانات (متغير)
        </label>
        <input
          type="text"
          value={section.dataBinding || ''}
          onChange={(e) => handleUpdate({ dataBinding: e.target.value || undefined })}
          placeholder="variable_name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          استخدم {{variable_name}} في المحتوى
        </p>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          المحاذاة
        </label>
        <div className="flex gap-2">
          {alignmentOptions.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() =>
                handleUpdate({
                  styles: { ...section.styles, alignment: value as any },
                })
              }
              className={`flex-1 px-3 py-2 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                section.styles?.alignment === value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          حجم الخط: {section.styles?.fontSize || 12}px
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={section.styles?.fontSize || 12}
          onChange={(e) =>
            handleUpdate({
              styles: { ...section.styles, fontSize: parseInt(e.target.value) },
            })
          }
          className="w-full"
        />
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          سماكة الخط
        </label>
        <select
          value={section.styles?.fontWeight || 'normal'}
          onChange={(e) =>
            handleUpdate({
              styles: { ...section.styles, fontWeight: e.target.value as any },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="normal">عادي</option>
          <option value="bold">عريض</option>
          <option value="light">خفيف</option>
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          لون النص
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={section.styles?.color || '#000000'}
            onChange={(e) =>
              handleUpdate({
                styles: { ...section.styles, color: e.target.value },
              })
            }
            className="w-16 h-10 rounded border border-gray-300"
          />
          <input
            type="text"
            value={section.styles?.color || '#000000'}
            onChange={(e) =>
              handleUpdate({
                styles: { ...section.styles, color: e.target.value },
              })
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
        </div>
      </div>

      {/* Margins */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الهوامش
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-600">أعلى</label>
            <input
              type="number"
              value={section.styles?.margin?.top || 0}
              onChange={(e) =>
                handleUpdate({
                  styles: {
                    ...section.styles,
                    margin: {
                      ...section.styles?.margin,
                      top: parseInt(e.target.value) || 0,
                    },
                  },
                })
              }
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">أسفل</label>
            <input
              type="number"
              value={section.styles?.margin?.bottom || 0}
              onChange={(e) =>
                handleUpdate({
                  styles: {
                    ...section.styles,
                    margin: {
                      ...section.styles?.margin,
                      bottom: parseInt(e.target.value) || 0,
                    },
                  },
                })
              }
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>

      {/* Spacer Height */}
      {section.type === 'spacer' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الارتفاع: {section.config?.height || 10}px
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={section.config?.height || 10}
            onChange={(e) =>
              handleUpdate({
                config: { ...section.config, height: parseInt(e.target.value) },
              })
            }
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

