import { ReportTemplate } from '@/types';

export const projectsTemplate: ReportTemplate = {
  id: 'projects-001',
  name: 'تقرير المشاريع',
  description: 'قالب تقرير متابعة المشاريع والحالة التنفيذية',
  category: 'projects',
  styles: {
    primaryColor: '#f59e0b',
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
      content: 'تقرير المشاريع',
      styles: {
        alignment: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f59e0b',
        margin: { top: 0, bottom: 10 },
      },
    },
    {
      id: 'subtitle-1',
      type: 'text',
      content: '{{report_date}}',
      dataBinding: 'report_date',
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
      content: 'نظرة عامة',
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
      content: '{{projects_overview}}',
      dataBinding: 'projects_overview',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
    {
      id: 'section-2',
      type: 'title',
      content: 'حالة المشاريع',
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
      content: '{{projects_status}}',
      dataBinding: 'projects_status',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { bottom: 20 },
      },
    },
  ],
};

