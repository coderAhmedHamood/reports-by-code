// مولد PDF باستخدام html2canvas لضمان تطابق المعاينة 100%
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ReportDocument } from '@/types';

/**
 * إنشاء PDF من عنصر HTML مباشرة
 * هذا يضمن تطابق 100% مع المعاينة
 */
export async function generatePDFFromElement(element: HTMLElement, filename: string = 'report.pdf'): Promise<void> {
  try {
    // حفظ الأنماط الأصلية
    const hiddenElements: Array<{ el: HTMLElement; display: string }> = [];
    
    // إخفاء أي عناصر غير مرغوبة (أزرار التحرير، إلخ)
    const editElements = element.querySelectorAll('[class*="absolute"], [class*="cursor-pointer"]');
    editElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style.display !== 'none') {
        hiddenElements.push({ el: htmlEl, display: htmlEl.style.display });
        htmlEl.style.display = 'none';
      }
    });

    // إزالة الحدود والظلال من الحاوية الرئيسية
    const originalStyles = {
      border: element.style.border,
      boxShadow: element.style.boxShadow,
      borderRadius: element.style.borderRadius,
    };
    
    element.style.border = 'none';
    element.style.boxShadow = 'none';
    element.style.borderRadius = '0';

    // التقاط الصورة من العنصر بجودة عالية
    const canvas = await html2canvas(element, {
      scale: 3, // جودة عالية جداً للطباعة
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      removeContainer: false,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        // إخفاء العناصر في النسخة المستنسخة أيضاً
        const clonedElement = clonedDoc.querySelector('[data-preview-container]') as HTMLElement;
        if (clonedElement) {
          // إخفاء عناصر التحرير
          const editEls = clonedElement.querySelectorAll('[class*="absolute"], [class*="cursor-pointer"]');
          editEls.forEach((el) => {
            (el as HTMLElement).style.display = 'none';
          });
          
          // إزالة الحدود والظلال
          clonedElement.style.border = 'none';
          clonedElement.style.boxShadow = 'none';
          clonedElement.style.borderRadius = '0';
        }
      },
    });
    
    // استعادة الأنماط الأصلية
    hiddenElements.forEach(({ el, display }) => {
      el.style.display = display;
    });
    
    element.style.border = originalStyles.border;
    element.style.boxShadow = originalStyles.boxShadow;
    element.style.borderRadius = originalStyles.borderRadius;

    // حساب أبعاد PDF
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');

    // إضافة الصورة إلى PDF
    const imgData = canvas.toDataURL('image/png');
    
    // تقسيم الصورة على صفحات إذا كانت طويلة
    const pageHeight = 297; // A4 height in mm
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // حفظ الملف
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF from element:', error);
    throw error;
  }
}

/**
 * دالة قديمة للتوافق - تستدعي الدالة الجديدة
 */
export async function generatePDF(document: ReportDocument): Promise<jsPDF> {
  // هذه الدالة لم تعد مستخدمة، لكن نتركها للتوافق
  const doc = new jsPDF({
    orientation: document.styles.orientation,
    unit: 'mm',
    format: document.styles.pageSize,
  });
  return doc;
}

export async function downloadPDF(document: ReportDocument, filename: string = 'report.pdf'): Promise<void> {
  // البحث عن عنصر المعاينة في DOM
  const previewElement = document.querySelector('[data-preview-container]') as HTMLElement;
  
  if (previewElement) {
    // استخدام الطريقة الجديدة
    await generatePDFFromElement(previewElement, filename);
  } else {
    // Fallback: استخدام الطريقة القديمة
    const pdf = await generatePDF(document);
    pdf.save(filename);
  }
}
