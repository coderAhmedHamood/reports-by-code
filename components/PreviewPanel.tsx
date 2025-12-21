'use client';

import { useReportStore } from '@/lib/store';
import { replaceVariables } from '@/lib/utils';
import { FiEdit2 } from 'react-icons/fi';
import ServiceReportHeader from './ServiceReportHeader';

export default function PreviewPanel() {
  const { currentDocument, selectedSection, setSelectedSection, previewMode } =
    useReportStore();

  if (!currentDocument) return null;

  const handleSectionClick = (sectionId: string) => {
    if (!previewMode) {
      setSelectedSection(sectionId);
    }
  };

  const renderSection = (section: any) => {
    const content = section.dataBinding
      ? replaceVariables(section.content, currentDocument.data)
      : section.content;

    const isSelected = selectedSection === section.id;
    const style = section.styles || {};

    const sectionStyle: React.CSSProperties = {
      textAlign: style.alignment || 'right',
      fontSize: `${style.fontSize || 12}px`,
      fontWeight: style.fontWeight || 'normal',
      color: style.color || '#000000',
      marginTop: `${style.margin?.top || 0}px`,
      marginBottom: `${style.margin?.bottom || 0}px`,
      marginLeft: `${style.margin?.left || 0}px`,
      marginRight: `${style.margin?.right || 0}px`,
      padding: previewMode ? '0' : '10px',
      border: previewMode ? 'none' : (isSelected ? '2px solid #0ea5e9' : '2px solid transparent'),
      borderRadius: previewMode ? '0' : '4px',
      cursor: previewMode ? 'default' : 'pointer',
      position: 'relative',
      backgroundColor: style.backgroundColor || (previewMode ? '' : (isSelected ? 'rgba(14, 165, 233, 0.1)' : 'transparent')),
      paddingTop: `${style.padding?.top || (previewMode ? 0 : 10)}px`,
      paddingBottom: `${style.padding?.bottom || (previewMode ? 0 : 10)}px`,
      paddingLeft: `${style.padding?.left || (previewMode ? 0 : 10)}px`,
      paddingRight: `${style.padding?.right || (previewMode ? 0 : 10)}px`,
    };

    // Spacer
    if (section.type === 'spacer') {
      return (
        <div
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          style={{
            ...sectionStyle,
            height: `${section.config?.height || 10}px`,
            backgroundColor: previewMode ? 'transparent' : '#f3f4f6',
            border: previewMode ? 'none' : (isSelected ? '2px dashed #0ea5e9' : '2px dashed #e5e7eb'),
          }}
        >
          {isSelected && !previewMode && (
            <span className="absolute top-0 left-0 text-xs bg-blue-600 text-white px-2 py-1 rounded">
              مسافة
            </span>
          )}
        </div>
      );
    }

    // Page Break
    if (section.type === 'page-break') {
      return (
        <div
          key={section.id}
          className="my-8 border-t-2 border-dashed border-gray-300 relative"
        >
          <span className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
            فاصل صفحة
          </span>
        </div>
      );
    }

    // Divider
    if (section.type === 'divider') {
      return (
        <div
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          style={{
            ...sectionStyle,
            borderTop: '2px solid #e5e7eb',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        />
      );
    }

    // Table
    if (section.type === 'table') {
      const headers = section.config?.headers || [];
      const rows = section.config?.rows || 0;
      const tableData = currentDocument.data[section.config?.dataBinding] || [];

      return (
        <div
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          style={sectionStyle}
          className={previewMode ? '' : (isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50')}
        >
          {isSelected && !previewMode && (
            <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-blue-600">
              <FiEdit2 className="w-3 h-3" />
              <span>محدد للتعديل</span>
            </div>
          )}
          <table className="w-full border-collapse border border-gray-300" style={{ fontSize: style.fontSize || 11 }}>
            <thead>
              <tr style={{ backgroundColor: '#14b8a6', color: '#ffffff' }}>
                {headers.map((header: string, idx: number) => (
                  <th key={idx} className="border border-gray-300 px-3 py-2 text-right font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, rowIdx) => {
                const rowData = tableData[rowIdx] || {};
                return (
                  <tr key={rowIdx}>
                    {headers.map((_: string, colIdx: number) => (
                      <td key={colIdx} className="border border-gray-300 px-3 py-2">
                        {rowData[colIdx] || ''}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // Checkbox Group
    if (section.type === 'checkbox-group') {
      const options = section.config?.options || [];
      const columns = section.config?.columns || 2;
      const selectedValues = currentDocument.data[section.dataBinding] || [];

      return (
        <div
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          style={sectionStyle}
          className={previewMode ? '' : (isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50')}
        >
          {isSelected && !previewMode && (
            <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-blue-600">
              <FiEdit2 className="w-3 h-3" />
              <span>محدد للتعديل</span>
            </div>
          )}
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {options.map((option: any, idx: number) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  readOnly
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span style={{ fontSize: style.fontSize || 12 }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Radio Group
    if (section.type === 'radio-group') {
      const options = section.config?.options || [];
      const selectedValue = currentDocument.data[section.dataBinding] || '';

      return (
        <div
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          style={sectionStyle}
          className={previewMode ? '' : (isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50')}
        >
          {isSelected && !previewMode && (
            <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-blue-600">
              <FiEdit2 className="w-3 h-3" />
              <span>محدد للتعديل</span>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {options.map((option: any, idx: number) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={section.id}
                  value={option.value}
                  checked={selectedValue === option.value}
                  readOnly
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span style={{ fontSize: style.fontSize || 12 }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Form Fields
    if (section.type === 'form-field') {
      const fields = section.config?.fields || [];

      return (
        <div
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          style={sectionStyle}
          className={previewMode ? '' : (isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50')}
        >
          {isSelected && !previewMode && (
            <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-blue-600">
              <FiEdit2 className="w-3 h-3" />
              <span>محدد للتعديل</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field: any, idx: number) => {
              const value = currentDocument.data[field.binding] || '';
              return (
                <div key={idx}>
                  <label className="block text-sm font-medium mb-1" style={{ color: style.color }}>
                    {field.label}:
                  </label>
                  <div className="border-b-2 border-gray-300 pb-1 min-h-[24px]">
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Signature
    if (section.type === 'signature') {
      const fields = section.config?.fields || [];

      return (
        <div
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          style={sectionStyle}
          className={previewMode ? '' : (isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50')}
        >
          {isSelected && !previewMode && (
            <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-blue-600">
              <FiEdit2 className="w-3 h-3" />
              <span>محدد للتعديل</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-8">
            {fields.map((field: any, idx: number) => (
              <div key={idx} style={{ backgroundColor: '#7dd3fc', padding: '15px', borderRadius: '8px' }}>
                <h4 className="font-bold mb-4 text-center" style={{ fontSize: style.fontSize || 14 }}>
                  {field.label}
                </h4>
                <div className="mb-3">
                  <label className="block text-sm mb-1">Name / الاسم:</label>
                  <div className="border-b-2 border-gray-300 pb-1 min-h-[24px]">
                    {currentDocument.data[field.nameBinding] || ''}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm mb-1">Signature / التوقيع:</label>
                  <div className="border-b-2 border-gray-300 pb-8 min-h-[60px]">
                    {currentDocument.data[field.signatureBinding] || ''}
                  </div>
                </div>
                {field.phone && (
                  <div className="text-sm text-gray-600">{field.phone}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Regular text content
    let contentElement: React.ReactNode = content;

    if (section.type === 'title') {
      contentElement = (
        <h2 style={{ fontSize: `${(style.fontSize || 18) + 4}px`, fontWeight: 'bold' }}>
          {content}
        </h2>
      );
    } else if (section.type === 'header') {
      contentElement = (
        <h1 style={{ fontSize: `${(style.fontSize || 20) + 2}px`, fontWeight: 'bold' }}>
          {content}
        </h1>
      );
    } else {
      contentElement = <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>;
    }

    return (
      <div
        key={section.id}
        onClick={() => handleSectionClick(section.id)}
        style={sectionStyle}
        className={previewMode ? '' : (isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50')}
      >
        {isSelected && !previewMode && (
          <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-blue-600">
            <FiEdit2 className="w-3 h-3" />
            <span>محدد للتعديل</span>
          </div>
        )}
        {contentElement}
      </div>
    );
  };

  const isServiceReport = currentDocument.templateId === 'service-report-001';

  return (
    <div className="max-w-4xl mx-auto">
      <div
        data-preview-container
        className="bg-white shadow-lg rounded-lg p-12"
        style={{
          minHeight: '297mm',
          width: '210mm',
          margin: '0 auto',
          direction: 'rtl',
        }}
      >
        {isServiceReport && <ServiceReportHeader />}
        {currentDocument.sections.map((section: any) => {
          // إخفاء العنوان النصي الافتراضي إذا استخدمنا رأس مخصص
          if (isServiceReport && section.id === 'header-1') {
            return null;
          }
          return renderSection(section);
        })}
      </div>
    </div>
  );
}

