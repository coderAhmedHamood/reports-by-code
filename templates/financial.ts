import { ReportTemplate } from '@/types';

export const financialTemplate: ReportTemplate = {
  id: 'financial-001',
  name: 'تقرير مالي',
  description: 'قالب تقرير مالي شامل للإيرادات والمصروفات',
  category: 'financial',
  styles: {
    primaryColor: '#8b5cf6',
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
      content: 'تقرير مالي',
      styles: {
        alignment: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8b5cf6',
        margin: { top: 0, bottom: 10 },
      },
    },
    {
      id: 'subtitle-1',
      type: 'text',
      content: '{{financial_period}}',
      dataBinding: 'financial_period',
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
      content: 'ملخص مالي',
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
      content: '{{financial_summary}}',
      dataBinding: 'financial_summary',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
    {
      id: 'section-2',
      type: 'title',
      content: 'الإيرادات والمصروفات',
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
      content: '{{revenue_expenses}}',
      dataBinding: 'revenue_expenses',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
  ],
};

