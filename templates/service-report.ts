import { ReportTemplate } from '@/types';

export const serviceReportTemplate: ReportTemplate = {
  id: 'service-report-001',
  name: 'تقرير الخدمة - Service Report',
  description: 'قالب تقرير خدمة شامل لمكافحة الآفات (مشابه للصورة)',
  category: 'service',
  styles: {
    primaryColor: '#14b8a6', // Teal
    secondaryColor: '#7dd3fc', // Light blue
    fontFamily: 'helvetica',
    pageSize: 'A4',
    orientation: 'portrait',
    margins: {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    },
  },
  sections: [
    // Header with Logo
    {
      id: 'header-1',
      type: 'header',
      content: 'Service Report / تقرير خدمة',
      styles: {
        alignment: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        margin: { top: 0, bottom: 20 },
        backgroundColor: '#f0fdfa',
        padding: { top: 15, bottom: 15, left: 20, right: 20 },
      },
    },
    // Report Details
    {
      id: 'report-details',
      type: 'form-field',
      content: 'Report Details / تفاصيل التقرير',
      dataBinding: 'report_details',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#14b8a6',
        margin: { top: 10, bottom: 15 },
        backgroundColor: '#f0fdfa',
        padding: { top: 10, bottom: 10, left: 15, right: 15 },
      },
      config: {
        fields: [
          { label: 'No / رقم', binding: 'report_number' },
          { label: 'Date / التاريخ', binding: 'report_date' },
          { label: 'Time in / وقت البداية', binding: 'time_in' },
          { label: 'Time out / وقت النهاية', binding: 'time_out' },
        ],
      },
    },
    // Customer Information Header
    {
      id: 'customer-header',
      type: 'title',
      content: "Customer's Information / معلومات العميل",
      styles: {
        alignment: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#14b8a6',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
    },
    // Customer Basic Info
    {
      id: 'customer-basic',
      type: 'form-field',
      content: 'Customer Basic Information',
      dataBinding: 'customer_basic',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { top: 10, bottom: 15 },
      },
      config: {
        fields: [
          { label: 'Name / الاسم', binding: 'customer_name' },
          { label: 'Address / العنوان', binding: 'customer_address' },
          { label: 'Job No / Contract / رقم العميل / العقد', binding: 'job_number' },
          { label: 'Treated Areas / مناطق المعالجة', binding: 'treated_areas' },
        ],
      },
    },
    // Treatment Type
    {
      id: 'treatment-type',
      type: 'radio-group',
      content: 'Treatment Type / نوع المعالجة',
      dataBinding: 'treatment_type',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#14b8a6',
        margin: { top: 15, bottom: 10 },
      },
      config: {
        options: [
          { label: 'Routine / دوري', value: 'routine' },
          { label: 'Follow-Up / مراجعة', value: 'follow-up' },
          { label: 'Call-Out / مكالمة صادرة', value: 'call-out' },
        ],
      },
    },
    // Pests Table Header
    {
      id: 'pests-table-header',
      type: 'title',
      content: "Customer's Information / معلومات العميل",
      styles: {
        alignment: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#14b8a6',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
    },
    // Pests Table
    {
      id: 'pests-table',
      type: 'table',
      content: 'Pests Information Table',
      dataBinding: 'pests_table',
      styles: {
        alignment: 'center',
        fontSize: 11,
        margin: { top: 10, bottom: 20 },
      },
      config: {
        headers: [
          'Pests / الآفات',
          'Level of Activity / مستوى النشاط',
          'Treatment/Control / المعالجة/التحكم',
          'Materials Used / الأدوات التي تم استخدامها',
          'Qty / العدد',
          'Units / الوحدات',
        ],
        rows: 4,
        dataBinding: 'pests_data',
      },
    },
    // Level of Activity
    {
      id: 'activity-level',
      type: 'radio-group',
      content: 'Level of Activity / مستوى النشاط',
      dataBinding: 'activity_level',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#7dd3fc',
        margin: { top: 15, bottom: 10 },
        padding: { top: 10, bottom: 10, left: 15, right: 15 },
      },
      config: {
        options: [
          { label: 'P = Preventative / الوقاية', value: 'preventative' },
          { label: 'L = Low / منخفض', value: 'low' },
          { label: 'M = Medium / متوسط', value: 'medium' },
          { label: 'High / عالي', value: 'high' },
        ],
      },
    },
    // Pest Risks Found
    {
      id: 'pest-risks',
      type: 'checkbox-group',
      content: 'Pest Risks Found / مخاطر الآفات التي تم اكتشافها',
      dataBinding: 'pest_risks',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#14b8a6',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
      config: {
        options: [
          { label: 'Stock Damage / تلف المخزون', value: 'stock_damage' },
          { label: 'Contamination / تلوث', value: 'contamination' },
          { label: 'Legal Action / اجراءات قانونية', value: 'legal_action' },
          { label: 'Reputation / سمعة', value: 'reputation' },
          { label: 'Building Damage / تلف المبنى', value: 'building_damage' },
          { label: 'Safety/Welfare / السلامة/الرعاية', value: 'safety_welfare' },
          { label: 'Disease Risks / مخاطر الأمراض', value: 'disease_risks' },
          { label: 'Other / أخرى', value: 'other' },
        ],
        columns: 4,
      },
    },
    // Treatment Report
    {
      id: 'treatment-report',
      type: 'title',
      content: 'Treatment Report / تقرير المعالجة',
      styles: {
        alignment: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#14b8a6',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
    },
    {
      id: 'treatment-report-content',
      type: 'text',
      content: '{{treatment_report_details}}',
      dataBinding: 'treatment_report_details',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { top: 10, bottom: 20 },
        padding: { top: 15, bottom: 15, left: 15, right: 15 },
        backgroundColor: '#ffffff',
      },
    },
    // Recommended Improvements
    {
      id: 'recommendations-header',
      type: 'title',
      content: 'Recommended Improvements / التوصية بالتحسينات',
      styles: {
        alignment: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#14b8a6',
        margin: { top: 20, bottom: 10 },
        padding: { top: 12, bottom: 12, left: 15, right: 15 },
      },
    },
    {
      id: 'recommendations-content',
      type: 'text',
      content: '{{recommended_improvements}}',
      dataBinding: 'recommended_improvements',
      styles: {
        alignment: 'right',
        fontSize: 12,
        margin: { top: 10, bottom: 20 },
        padding: { top: 15, bottom: 15, left: 15, right: 15 },
        backgroundColor: '#ffffff',
      },
    },
    // Signatures
    {
      id: 'signatures',
      type: 'signature',
      content: 'Signatures / التوقيعات',
      dataBinding: 'signatures',
      styles: {
        alignment: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        margin: { top: 30, bottom: 10 },
      },
      config: {
        fields: [
          {
            label: 'Technician / الفني',
            nameBinding: 'technician_name',
            signatureBinding: 'technician_signature',
            phone: 'Tel: 920004107',
          },
          {
            label: 'Customer / العميل',
            nameBinding: 'customer_name_signature',
            signatureBinding: 'customer_signature',
          },
        ],
      },
    },
  ],
};

