// Zustand store لإدارة حالة التطبيق
import { create } from 'zustand';
import { ReportDocument, ReportSection, ReportData, TemplateStyles } from '@/types';

interface ReportStore {
  currentDocument: ReportDocument | null;
  selectedSection: string | null;
  previewMode: boolean;
  
  setCurrentDocument: (doc: ReportDocument | null) => void;
  updateDocumentData: (data: ReportData) => void;
  addSection: (section: ReportSection, index?: number) => void;
  updateSection: (sectionId: string, updates: Partial<ReportSection>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  setSelectedSection: (sectionId: string | null) => void;
  updateStyles: (styles: Partial<TemplateStyles>) => void;
  setPreviewMode: (mode: boolean) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  currentDocument: null,
  selectedSection: null,
  previewMode: false,

  setCurrentDocument: (doc) => set({ currentDocument: doc }),

  updateDocumentData: (data) =>
    set((state) => ({
      currentDocument: state.currentDocument
        ? { ...state.currentDocument, data: { ...state.currentDocument.data, ...data } }
        : null,
    })),

  addSection: (section, index) =>
    set((state) => {
      if (!state.currentDocument) return state;
      const sections = [...state.currentDocument.sections];
      if (index !== undefined) {
        sections.splice(index, 0, section);
      } else {
        sections.push(section);
      }
      return {
        currentDocument: {
          ...state.currentDocument,
          sections,
          updatedAt: new Date(),
        },
      };
    }),

  updateSection: (sectionId, updates) =>
    set((state) => {
      if (!state.currentDocument) return state;
      const sections = state.currentDocument.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      );
      return {
        currentDocument: {
          ...state.currentDocument,
          sections,
          updatedAt: new Date(),
        },
      };
    }),

  deleteSection: (sectionId) =>
    set((state) => {
      if (!state.currentDocument) return state;
      const sections = state.currentDocument.sections.filter((s) => s.id !== sectionId);
      return {
        currentDocument: {
          ...state.currentDocument,
          sections,
          updatedAt: new Date(),
        },
        selectedSection: state.selectedSection === sectionId ? null : state.selectedSection,
      };
    }),

  reorderSections: (fromIndex, toIndex) =>
    set((state) => {
      if (!state.currentDocument) return state;
      const sections = [...state.currentDocument.sections];
      const [removed] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, removed);
      return {
        currentDocument: {
          ...state.currentDocument,
          sections,
          updatedAt: new Date(),
        },
      };
    }),

  setSelectedSection: (sectionId) => set({ selectedSection: sectionId }),

  updateStyles: (styles) =>
    set((state) => {
      if (!state.currentDocument) return state;
      return {
        currentDocument: {
          ...state.currentDocument,
          styles: { ...state.currentDocument.styles, ...styles },
          updatedAt: new Date(),
        },
      };
    }),

  setPreviewMode: (mode) => set({ previewMode: mode }),
}));

