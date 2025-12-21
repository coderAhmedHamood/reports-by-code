// مكتبة القوالب الجاهزة
import { ReportTemplate } from '@/types';
import { executiveTemplate } from './executive';
import { performanceTemplate } from './performance';
import { projectsTemplate } from './projects';
import { financialTemplate } from './financial';
import { serviceReportTemplate } from './service-report';
import { inspectionReportTemplate } from './inspection-report';

export const templates: ReportTemplate[] = [
  serviceReportTemplate, // القالب الافتراضي أولاً
  inspectionReportTemplate,
  executiveTemplate,
  performanceTemplate,
  projectsTemplate,
  financialTemplate,
];

export function getTemplateById(id: string): ReportTemplate | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): ReportTemplate[] {
  return templates.filter((t) => t.category === category);
}

