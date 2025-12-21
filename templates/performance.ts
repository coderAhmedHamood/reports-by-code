import { ReportTemplate } from '@/types';

export const performanceTemplate: ReportTemplate = {
  id: 'performance-001',
  name: 'تقرير الأداء',
  description: 'قالب تقرير أداء شامل للمؤشرات والنتائج',
  category: 'performance',
  styles: {
    primaryColor: '#10b981',
    secondaryColor: '#64748b',
    fontFamily: 'helvetica',
    pageSize: 'A4',
    orientation: 'portrait',
    margins: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  },
  sections: [
    {
      id: 'header-1',
      type: 'header',
      content: 'تقرير الأداء',
      styles: {
        alignment: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#10b981',
        margin: { top: 0, bottom: 10 },
      },
    },
    {
      id: 'subtitle-1',
      type: 'text',
      content: '{{period}}',
      dataBinding: 'period',
      styles: {
        alignment: 'center',
        fontSize: 14,
        color: '#64748b',
        margin: { bottom: 20 },
      },
    },
    {
      id: 'section-1',
      type: 'title',
      content: 'المؤشرات الرئيسية',
      styles: {
        alignment: 'right',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        margin: { top: 20, bottom: 10 },
      },
    },
    {
      id: 'section-1-content',
      type: 'text',
      content: '{{kpi_overview}}',
      dataBinding: 'kpi_overview',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
    {
      id: 'section-2',
      type: 'title',
      content: 'تحليل الأداء',
      styles: {
        alignment: 'right',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        margin: { top: 20, bottom: 10 },
      },
    },
    {
      id: 'section-2-content',
      type: 'text',
      content: '{{performance_analysis}}',
      dataBinding: 'performance_analysis',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
  ],
};

