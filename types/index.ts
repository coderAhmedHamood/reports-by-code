// أنواع البيانات الأساسية للنظام

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'performance' | 'projects' | 'financial' | 'service' | 'inspection';
  sections: ReportSection[];
  styles: TemplateStyles;
}

export interface ReportSection {
  id: string;
  type: 'header' | 'footer' | 'title' | 'text' | 'table' | 'chart' | 'image' | 'spacer' | 'page-break' | 'checkbox-group' | 'radio-group' | 'signature' | 'divider' | 'form-field';
  content: string;
  dataBinding?: string; // {{variable_name}}
  styles: SectionStyles;
  config?: Record<string, any>;
}

export interface SectionStyles {
  alignment?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'light';
  color?: string;
  backgroundColor?: string;
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

export interface TemplateStyles {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  pageSize: 'A4' | 'Letter';
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface ReportData {
  [key: string]: any;
}

export interface ReportDocument {
  id: string;
  templateId: string;
  name: string;
  data: ReportData;
  sections: ReportSection[];
  styles: TemplateStyles;
  createdAt: Date;
  updatedAt: Date;
}

