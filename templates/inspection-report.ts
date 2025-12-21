import { ReportTemplate } from '@/types';

export const inspectionReportTemplate: ReportTemplate = {
  id: 'inspection-report-001',
  name: 'تقرير التفتيش - Inspection Report',
  description: 'قالب تقرير تفتيش شامل مع جداول وخيارات متعددة',
  category: 'inspection',
  styles: {
    primaryColor: '#06b6d4', // Cyan
    secondaryColor: '#67e8f9',
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
      content: 'Inspection Report / تقرير التفتيش',
      styles: {
        alignment: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        margin: { top: 0, bottom: 20 },
        backgroundColor: '#ecfeff',
        padding: { top: 15, bottom: 15, left: 20, right: 20 },
      },
    },
    {
      id: 'inspection-details',
      type: 'form-field',
      content: 'Inspection Details',
      dataBinding: 'inspection_details',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#06b6d4',
        margin: { top: 10, bottom: 15 },
        backgroundColor: '#ecfeff',
        padding: { top: 10, bottom: 10, left: 15, right: 15 },
      },
      config: {
        fields: [
          { label: 'Inspection No / رقم التفتيش', binding: 'inspection_number' },
          { label: 'Date / التاريخ', binding: 'inspection_date' },
          { label: 'Inspector / المفتش', binding: 'inspector_name' },
          { label: 'Location / الموقع', binding: 'inspection_location' },
        ],
      },
    },
    {
      id: 'findings-header',
      type: 'title',
      content: 'Findings / النتائج',
      styles: {
        alignment: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#06b6d4',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
    },
    {
      id: 'findings-table',
      type: 'table',
      content: 'Findings Table',
      dataBinding: 'findings_table',
      styles: {
        alignment: 'center',
        fontSize: 11,
        margin: { top: 10, bottom: 20 },
      },
      config: {
        headers: [
          'Item / البند',
          'Status / الحالة',
          'Notes / ملاحظات',
          'Action Required / الإجراء المطلوب',
        ],
        rows: 5,
        dataBinding: 'findings_data',
      },
    },
    {
      id: 'compliance-check',
      type: 'checkbox-group',
      content: 'Compliance Check / فحص الامتثال',
      dataBinding: 'compliance_check',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#06b6d4',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
      config: {
        options: [
          { label: 'Safety Standards / معايير السلامة', value: 'safety' },
          { label: 'Health Regulations / لوائح الصحة', value: 'health' },
          { label: 'Environmental / البيئية', value: 'environmental' },
          { label: 'Quality Control / مراقبة الجودة', value: 'quality' },
        ],
        columns: 2,
      },
    },
    {
      id: 'recommendations',
      type: 'title',
      content: 'Recommendations / التوصيات',
      styles: {
        alignment: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#06b6d4',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
    },
    {
      id: 'recommendations-content',
      type: 'text',
      content: '{{recommendations}}',
      dataBinding: 'recommendations',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { top: 10, bottom: 20 },
        padding: { top: 15, bottom: 15, left: 15, right: 15 },
        backgroundColor: '#ffffff',
      },
    },
  ],
};

