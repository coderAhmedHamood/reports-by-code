import { useReportStore } from '@/lib/store';

export default function ServiceReportHeader() {
  const { currentDocument } = useReportStore();

  if (!currentDocument) return null;

  const data = currentDocument.data || {};

  const FieldRow = ({
    label,
    value,
  }: {
    label: string;
    value?: string;
  }) => (
    <div className="flex items-center gap-2 mb-2">
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e0f4f5] text-[#1f4f63] text-[11px] font-semibold">
        {label}
      </span>
      <div className="flex-1 min-w-[130px] px-3 py-1 rounded-full bg-[#d7eeee] text-[11px] text-[#1f4f63]">
        {value || ' '}
      </div>
    </div>
  );

  return (
    <div className="mb-4">
      {/* العنوان الرئيسي + الشعار */}
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-[22px] font-extrabold text-[#1f3656] tracking-wide">
            Service Report
          </h1>
          <p className="text-[18px] font-semibold text-[#1f3656] leading-tight">
            تقرير خدمة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#00c0b3] flex items-center justify-center text-white text-2xl font-bold">
            C
          </div>
          <div className="leading-tight text-right">
            <div className="text-[20px] font-extrabold text-[#00c0b3]">
              CleanLife
            </div>
          </div>
        </div>
      </div>

      {/* صفوف البيانات العلوية */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-right">
        <div>
          <FieldRow label="No رقم:" value={data.report_number} />
          <FieldRow label="Date التاريخ:" value={data.report_date} />
        </div>
        <div>
          <FieldRow label="Time in وقت البداية:" value={data.time_in} />
          <FieldRow label="Time out وقت النهاية:" value={data.time_out} />
        </div>
      </div>
    </div>
  );
}


