// مولد PDF
import jsPDF from 'jspdf';
import { ReportDocument } from '@/types';
import { replaceVariables } from './utils';

// تحويل hex color إلى RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export async function generatePDF(document: ReportDocument): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: document.styles.orientation,
    unit: 'mm',
    format: document.styles.pageSize,
  });

  // تعيين الخطوط
  doc.setFont(document.styles.fontFamily || 'helvetica');

  let currentY = document.styles.margins.top;
  const pageWidth = document.styles.orientation === 'landscape' ? 297 : 210;
  const pageHeight = document.styles.orientation === 'landscape' ? 210 : 297;
  const contentWidth = pageWidth - document.styles.margins.left - document.styles.margins.right;
  const maxY = pageHeight - document.styles.margins.bottom;

  for (const section of document.sections) {
    // معالجة فاصل الصفحات
    if (section.type === 'page-break') {
      doc.addPage();
      currentY = document.styles.margins.top;
      continue;
    }

    // التحقق من تجاوز الصفحة
    if (currentY > maxY) {
      doc.addPage();
      currentY = document.styles.margins.top;
    }

    // تطبيق الهوامش
    const x = document.styles.margins.left + (section.styles.margin?.left || 0);
    let y = currentY + (section.styles.margin?.top || 0);

    // تطبيق الأنماط
    const fontSize = section.styles.fontSize || 12;
    const fontWeight = section.styles.fontWeight || 'normal';
    const color = section.styles.color || '#000000';
    const alignment = section.styles.alignment || 'right';

    doc.setFontSize(fontSize);
    doc.setFont(fontWeight === 'bold' ? 'helvetica' : 'helvetica', fontWeight);
    
    // تحويل اللون من hex إلى RGB
    const rgbColor = hexToRgb(color);
    if (rgbColor) {
      doc.setTextColor(rgbColor.r, rgbColor.g, rgbColor.b);
    }

    // معالجة المحتوى حسب النوع
    const content = section.dataBinding
      ? replaceVariables(section.content, document.data)
      : section.content;

    // حساب موضع X بناءً على المحاذاة
    let textX = x;
    const maxWidth = contentWidth;
    
    if (alignment === 'center') {
      textX = pageWidth / 2;
    } else if (alignment === 'right') {
      textX = pageWidth - document.styles.margins.right;
    }

    if (section.type === 'title') {
      doc.setFontSize(fontSize + 4);
      doc.setFont('helvetica', 'bold');
      const lines = doc.splitTextToSize(content, maxWidth);
      doc.text(lines, textX, y, {
        maxWidth: maxWidth,
        align: alignment as 'left' | 'center' | 'right' | 'justify',
      });
      y += lines.length * (fontSize * 0.5) + 8;
    } else if (section.type === 'text') {
      const lines = doc.splitTextToSize(content, maxWidth);
      doc.text(lines, textX, y, {
        maxWidth: maxWidth,
        align: alignment as 'left' | 'center' | 'right' | 'justify',
      });
      y += lines.length * (fontSize * 0.5) + 5;
    } else if (section.type === 'header') {
      doc.setFontSize(fontSize + 2);
      doc.setFont('helvetica', 'bold');
      const lines = doc.splitTextToSize(content, maxWidth);
      doc.text(lines, textX, y, {
        maxWidth: maxWidth,
        align: alignment as 'left' | 'center' | 'right' | 'justify',
      });
      y += lines.length * (fontSize * 0.5) + 6;
    } else if (section.type === 'spacer') {
      const height = section.config?.height || 10;
      y += height / 2.83; // تحويل من px إلى mm (تقريبي)
    } else if (section.type === 'divider') {
      doc.setDrawColor(200, 200, 200);
      doc.line(x, y, pageWidth - document.styles.margins.right, y);
      y += 5;
    } else if (section.type === 'table') {
      const headers = section.config?.headers || [];
      const rows = section.config?.rows || 0;
      const tableData = document.data[section.config?.dataBinding] || [];
      const cellWidth = maxWidth / headers.length;
      const cellHeight = 8;

      // Header
      doc.setFillColor(20, 184, 166); // Teal
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(fontSize - 1);
      doc.setFont('helvetica', 'bold');
      
      let headerX = x;
      headers.forEach((header: string, idx: number) => {
        doc.rect(headerX, y, cellWidth, cellHeight, 'F');
        const headerLines = doc.splitTextToSize(header, cellWidth - 2);
        doc.text(headerLines, headerX + cellWidth / 2, y + cellHeight / 2 + 2, {
          align: 'center',
          maxWidth: cellWidth - 2,
        });
        headerX += cellWidth;
      });
      y += cellHeight;

      // Rows
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
        const row = tableData[rowIdx] || [];
        let rowX = x;
        headers.forEach((_: string, colIdx: number) => {
          doc.rect(rowX, y, cellWidth, cellHeight, 'S');
          const cellText = row[colIdx] || '';
          const cellLines = doc.splitTextToSize(cellText, cellWidth - 2);
          doc.text(cellLines, rowX + cellWidth / 2, y + cellHeight / 2 + 2, {
            align: 'center',
            maxWidth: cellWidth - 2,
          });
          rowX += cellWidth;
        });
        y += cellHeight;
      }
      y += 5;
    } else if (section.type === 'form-field') {
      const fields = section.config?.fields || [];
      doc.setFontSize(fontSize);
      fields.forEach((field: any) => {
        const value = document.data[field.binding] || '';
        const labelText = `${field.label}: ${value}`;
        const lines = doc.splitTextToSize(labelText, maxWidth);
        doc.text(lines, textX, y, {
          maxWidth: maxWidth,
          align: alignment as 'left' | 'center' | 'right' | 'justify',
        });
        y += lines.length * (fontSize * 0.5) + 3;
      });
    } else if (section.type === 'checkbox-group' || section.type === 'radio-group') {
      const options = section.config?.options || [];
      const selectedValues = section.type === 'checkbox-group'
        ? (document.data[section.dataBinding || ''] || [])
        : [document.data[section.dataBinding || '']];
      
      options.forEach((option: any) => {
        const isSelected = selectedValues.includes(option.value);
        const optionText = `${isSelected ? '☑' : '☐'} ${option.label}`;
        const lines = doc.splitTextToSize(optionText, maxWidth);
        doc.text(lines, textX, y, {
          maxWidth: maxWidth,
          align: alignment as 'left' | 'center' | 'right' | 'justify',
        });
        y += lines.length * (fontSize * 0.5) + 3;
      });
    } else if (section.type === 'signature') {
      const fields = section.config?.fields || [];
      const signatureWidth = maxWidth / fields.length;
      
      fields.forEach((field: any) => {
        const nameX = x + (fields.indexOf(field) * signatureWidth);
        doc.setFontSize(fontSize - 1);
        doc.setFont('helvetica', 'bold');
        doc.text(field.label, nameX + signatureWidth / 2, y, { align: 'center' });
        y += 5;
        
        doc.setFont('helvetica', 'normal');
        const name = document.data[field.nameBinding] || '';
        doc.text(`Name / الاسم: ${name}`, nameX + 5, y);
        y += 5;
        
        const signature = document.data[field.signatureBinding] || '';
        doc.text(`Signature / التوقيع: ${signature}`, nameX + 5, y);
        y += 8;
        
        if (field.phone) {
          doc.setFontSize(fontSize - 2);
          doc.text(field.phone, nameX + 5, y);
          y += 5;
        }
      });
    }

    currentY = y + (section.styles.margin?.bottom || 0);
  }

  // إضافة ترقيم الصفحات
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor('#666666');
    doc.text(
      `صفحة ${i} من ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  return doc;
}

export async function downloadPDF(document: ReportDocument, filename: string = 'report.pdf'): Promise<void> {
  const pdf = await generatePDF(document);
  pdf.save(filename);
}

