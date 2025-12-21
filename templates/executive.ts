import { ReportTemplate } from '@/types';

export const executiveTemplate: ReportTemplate = {
  id: 'executive-001',
  name: 'تقرير تنفيذي',
  description: 'قالب تقرير تنفيذي شامل لمجلس الإدارة',
  category: 'executive',
  styles: {
    primaryColor: '#0ea5e9',
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
      content: 'تقرير تنفيذي',
      styles: {
        alignment: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0ea5e9',
        margin: { top: 0, bottom: 10 },
      },
    },
    {
      id: 'subtitle-1',
      type: 'text',
      content: '{{report_period}}',
      dataBinding: 'report_period',
      styles: {
        alignment: 'center',
        fontSize: 14,
        color: '#64748b',
        margin: { bottom: 20 },
      },
    },
    {
      id: 'spacer-1',
      type: 'spacer',
      content: '',
      styles: {},
      config: { height: 10 },
    },
    {
      id: 'section-1',
      type: 'title',
      content: 'ملخص تنفيذي',
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
      content: '{{executive_summary}}',
      dataBinding: 'executive_summary',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
    {
      id: 'section-2',
      type: 'title',
      content: 'النتائج الرئيسية',
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
      content: '{{key_results}}',
      dataBinding: 'key_results',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
    {
      id: 'section-3',
      type: 'title',
      content: 'التوصيات',
      styles: {
        alignment: 'right',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        margin: { top: 20, bottom: 10 },
      },
    },
    {
      id: 'section-3-content',
      type: 'text',
      content: '{{recommendations}}',
      dataBinding: 'recommendations',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
  ],
};

