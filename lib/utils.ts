// وظائف مساعدة
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// استبدال المتغيرات في النص
export function replaceVariables(text: string, data: Record<string, any>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? String(data[key]) : match;
  });
}

// إنشاء معرف فريد
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// تحويل بكسل إلى مم (لـ PDF)
export function pxToMm(px: number): number {
  return px * 0.264583;
}

// تحويل مم إلى بكسل
export function mmToPx(mm: number): number {
  return mm * 3.779527559;
}

