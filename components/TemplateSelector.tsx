'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { templates } from '@/templates';
import { useReportStore } from '@/lib/store';
import { ReportDocument } from '@/types';
import { generateId } from '@/lib/utils';
import { FiFileText, FiTrendingUp, FiBriefcase, FiDollarSign } from 'react-icons/fi';

const categoryIcons = {
  executive: FiFileText,
  performance: FiTrendingUp,
  projects: FiBriefcase,
  financial: FiDollarSign,
  service: FiFileText,
  inspection: FiFileText,
};

const categoryColors = {
  executive: 'bg-blue-500',
  performance: 'bg-green-500',
  projects: 'bg-amber-500',
  financial: 'bg-purple-500',
  service: 'bg-teal-500',
  inspection: 'bg-cyan-500',
};

export default function TemplateSelector() {
  const router = useRouter();
  const { setCurrentDocument } = useReportStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    const document: ReportDocument = {
      id: generateId(),
      templateId: template.id,
      name: template.name,
      data: {},
      sections: [...template.sections],
      styles: { ...template.styles },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCurrentDocument(document);
    router.push('/editor');
  };

  const categories = Array.from(new Set(templates.map((t) => t.category)));
  const filteredTemplates = selectedCategory
    ? templates.filter((t) => t.category === selectedCategory)
    : templates;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          الكل
        </button>
        {categories.map((category) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons];
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {category === 'executive' && 'تنفيذي'}
              {category === 'performance' && 'أداء'}
              {category === 'projects' && 'مشاريع'}
              {category === 'financial' && 'مالي'}
              {category === 'service' && 'خدمة'}
              {category === 'inspection' && 'تفتيش'}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = categoryIcons[template.category];
          const bgColor = categoryColors[template.category];
          return (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {template.sections.length} قسم
                </span>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  اختيار →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

