'use client';

import { useState, useEffect } from 'react';
import { useReportStore } from '@/lib/store';

export default function DataInputPanel() {
  const { currentDocument, updateDocumentData } = useReportStore();
  const [localData, setLocalData] = useState<Record<string, any>>({});
  const [jsonInput, setJsonInput] = useState('');

  useEffect(() => {
    if (currentDocument) {
      setLocalData(currentDocument.data);
      setJsonInput(JSON.stringify(currentDocument.data, null, 2));
    }
  }, [currentDocument]);

  if (!currentDocument) return null;

  // استخراج جميع المتغيرات من الأقسام
  const variables = new Set<string>();
  const complexFields: any[] = [];

  currentDocument.sections.forEach((section) => {
    if (section.dataBinding) {
      variables.add(section.dataBinding);
    }
    
    // استخراج المتغيرات من النص
    const matches = section.content.match(/\{\{(\w+)\}\}/g);
    if (matches) {
      matches.forEach((match) => {
        const varName = match.replace(/\{\{|\}\}/g, '');
        variables.add(varName);
      });
    }

    // معالجة الأنواع المعقدة
    if (section.type === 'form-field' && section.config?.fields) {
      section.config.fields.forEach((field: any) => {
        if (field.binding) {
          variables.add(field.binding);
          complexFields.push({ type: 'form-field', field, sectionId: section.id });
        }
      });
    }

    if (section.type === 'table' && section.config?.dataBinding) {
      variables.add(section.config.dataBinding);
      complexFields.push({ type: 'table', section, sectionId: section.id });
    }

    if (section.type === 'signature' && section.config?.fields) {
      section.config.fields.forEach((field: any) => {
        if (field.nameBinding) variables.add(field.nameBinding);
        if (field.signatureBinding) variables.add(field.signatureBinding);
        complexFields.push({ type: 'signature', field, sectionId: section.id });
      });
    }
  });

  const handleInputChange = (key: string, value: any) => {
    const newData = { ...localData, [key]: value };
    setLocalData(newData);
    setJsonInput(JSON.stringify(newData, null, 2));
    updateDocumentData(newData);
  };

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    try {
      const parsed = JSON.parse(value);
      setLocalData(parsed);
      updateDocumentData(parsed);
    } catch (e) {
      // JSON غير صحيح، نتركه كما هو
    }
  };

  const handleCheckboxChange = (binding: string, value: string, checked: boolean) => {
    const currentValues = localData[binding] || [];
    let newValues;
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v: string) => v !== value);
    }
    handleInputChange(binding, newValues);
  };

  const handleTableDataChange = (binding: string, rowIndex: number, colIndex: number, value: string) => {
    const tableData = localData[binding] || [];
    const newTableData = [...tableData];
    if (!newTableData[rowIndex]) {
      newTableData[rowIndex] = [];
    }
    newTableData[rowIndex] = [...newTableData[rowIndex]];
    newTableData[rowIndex][colIndex] = value;
    handleInputChange(binding, newTableData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-900 mb-4">إدخال البيانات</h3>
        <p className="text-sm text-gray-600 mb-4">
          أدخل القيم للمتغيرات المستخدمة في التقرير
        </p>
      </div>

      {/* Complex Fields */}
      {complexFields.map((item, idx) => {
        if (item.type === 'form-field') {
          const field = item.field;
          const value = localData[field.binding] || '';
          return (
            <div key={idx} className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field.binding, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`أدخل ${field.label}...`}
              />
            </div>
          );
        }

        if (item.type === 'table') {
          const section = item.section;
          const headers = section.config?.headers || [];
          const rows = section.config?.rows || 0;
          const binding = section.config?.dataBinding;
          const tableData = localData[binding] || [];

          return (
            <div key={idx} className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {section.content || 'جدول البيانات'}
              </label>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-xs">
                  <thead>
                    <tr className="bg-teal-600 text-white">
                      {headers.map((header: string, hIdx: number) => (
                        <th key={hIdx} className="border border-gray-300 px-2 py-1 text-right">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: rows }).map((_, rowIdx) => {
                      const row = tableData[rowIdx] || [];
                      return (
                        <tr key={rowIdx}>
                          {headers.map((_: string, colIdx: number) => (
                            <td key={colIdx} className="border border-gray-300 p-1">
                              <input
                                type="text"
                                value={row[colIdx] || ''}
                                onChange={(e) => handleTableDataChange(binding, rowIdx, colIdx, e.target.value)}
                                className="w-full px-1 py-0.5 border-0 focus:ring-1 focus:ring-blue-500 text-xs"
                                placeholder="..."
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        if (item.type === 'signature') {
          const field = item.field;
          return (
            <div key={idx} className="border-b pb-4">
              <h4 className="font-medium text-gray-700 mb-2">{field.label}</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">الاسم</label>
                  <input
                    type="text"
                    value={localData[field.nameBinding] || ''}
                    onChange={(e) => handleInputChange(field.nameBinding, e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">التوقيع</label>
                  <input
                    type="text"
                    value={localData[field.signatureBinding] || ''}
                    onChange={(e) => handleInputChange(field.signatureBinding, e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="اكتب التوقيع..."
                  />
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* Radio Groups */}
      {currentDocument.sections
        .filter((s) => s.type === 'radio-group')
        .map((section) => {
          const options = section.config?.options || [];
          const selectedValue = localData[section.dataBinding || ''] || '';

          return (
            <div key={section.id} className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {section.content}
              </label>
              <div className="space-y-2">
                {options.map((option: any) => (
                  <label key={option.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={section.id}
                      value={option.value}
                      checked={selectedValue === option.value}
                      onChange={(e) => handleInputChange(section.dataBinding || '', e.target.value)}
                      className="w-4 h-4 text-teal-600"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}

      {/* Checkbox Groups */}
      {currentDocument.sections
        .filter((s) => s.type === 'checkbox-group')
        .map((section) => {
          const options = section.config?.options || [];
          const selectedValues = localData[section.dataBinding || ''] || [];

          return (
            <div key={section.id} className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {section.content}
              </label>
              <div className="space-y-2">
                {options.map((option: any) => (
                  <label key={option.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option.value)}
                      onChange={(e) =>
                        handleCheckboxChange(section.dataBinding || '', option.value, e.target.checked)
                      }
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}

      {/* Simple Text Inputs */}
      <div className="space-y-4">
        {Array.from(variables)
          .filter((variable) => !complexFields.some((cf) => cf.field?.binding === variable || cf.section?.config?.dataBinding === variable))
          .map((variable) => (
            <div key={variable}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {variable}
              </label>
              {variable.includes('summary') || variable.includes('analysis') || variable.includes('results') || variable.includes('report') || variable.includes('improvements') ? (
                <textarea
                  value={localData[variable] || ''}
                  onChange={(e) => handleInputChange(variable, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder={`أدخل ${variable}...`}
                />
              ) : (
                <input
                  type="text"
                  value={localData[variable] || ''}
                  onChange={(e) => handleInputChange(variable, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`أدخل ${variable}...`}
                />
              )}
            </div>
          ))}
      </div>

      {/* JSON Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          أو أدخل البيانات بصيغة JSON:
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => handleJsonChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs"
          rows={8}
          placeholder='{"variable_name": "value"}'
        />
      </div>
    </div>
  );
}
