# بنية النظام - نظام بناء التقارير الديناميكي

## نظرة عامة على البنية

النظام مبني باستخدام Next.js 14 مع TypeScript و React، ويتكون من عدة طبقات:

## الطبقات الرئيسية

### 1. الطبقة التقديمية (Presentation Layer)

**الملفات:**
- `app/page.tsx` - الصفحة الرئيسية (اختيار القالب)
- `app/editor/page.tsx` - صفحة المحرر
- `components/` - جميع مكونات React

**المكونات الرئيسية:**
- `TemplateSelector` - اختيار القالب
- `EditorLayout` - التخطيط الرئيسي للمحرر
- `Sidebar` - الشريط الجانبي للأقسام
- `PreviewPanel` - معاينة التقرير
- `SectionEditor` - محرر الأقسام
- `DataInputPanel` - إدخال البيانات

### 2. طبقة إدارة الحالة (State Management)

**الملفات:**
- `lib/store.ts` - Zustand store لإدارة الحالة

**الحالة الرئيسية:**
- `currentDocument` - المستند الحالي
- `selectedSection` - القسم المحدد
- `previewMode` - وضع المعاينة

### 3. طبقة الأعمال (Business Logic)

**الملفات:**
- `lib/pdfGenerator.ts` - توليد PDF
- `lib/utils.ts` - وظائف مساعدة
- `templates/` - القوالب الجاهزة

### 4. طبقة البيانات (Data Layer)

**الملفات:**
- `types/index.ts` - تعريفات TypeScript
- `templates/*.ts` - تعريفات القوالب

## تدفق البيانات

```
المستخدم يختار قالب
  ↓
إنشاء ReportDocument من القالب
  ↓
تخزين في Zustand Store
  ↓
المستخدم يعدل المحتوى/البيانات
  ↓
تحديث Store
  ↓
تحديث المعاينة تلقائياً
  ↓
تصدير PDF عند الطلب
```

## هيكل البيانات

### ReportDocument
```typescript
{
  id: string
  templateId: string
  name: string
  data: Record<string, any>  // البيانات الديناميكية
  sections: ReportSection[]  // الأقسام
  styles: TemplateStyles     // الأنماط
  createdAt: Date
  updatedAt: Date
}
```

### ReportSection
```typescript
{
  id: string
  type: 'header' | 'footer' | 'title' | 'text' | ...
  content: string
  dataBinding?: string  // اسم المتغير
  styles: SectionStyles
  config?: Record<string, any>
}
```

## معالجة المتغيرات

النظام يستخدم نمط `{{variable_name}}` لربط البيانات:

1. استخراج المتغيرات من `content`
2. استبدالها بالقيم من `document.data`
3. استخدام `replaceVariables()` للاستبدال

## توليد PDF

العملية:
1. إنشاء jsPDF document
2. تكرار على كل قسم
3. تطبيق الأنماط والمحاذاة
4. رسم المحتوى
5. إضافة ترقيم الصفحات
6. حفظ/تنزيل الملف

## التوسع المستقبلي

### إمكانيات التحسين:
- [ ] دعم الجداول
- [ ] دعم الرسوم البيانية
- [ ] دعم الصور
- [ ] حفظ/تحميل القوالب
- [ ] التعاون المتعدد المستخدمين
- [ ] API للتكامل الخارجي
- [ ] دعم المزيد من الخطوط العربية
- [ ] معاينة متعددة الصفحات محسّنة

