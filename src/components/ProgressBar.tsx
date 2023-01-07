type Props = {
  label: string;
  value: number;
  max: number;
};

export const ProgressBar = ({ label, value, max }: Props) => {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <div className="flex select-none justify-between text-xs font-semibold text-slate-400">
        <span className="rounded-md uppercase">{label}</span>
        <span className="after:content-['_%']">{((value / max) * 100).toFixed(2)}</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded bg-slate-600 text-xs">
        <div style={{ width: `${(value / max) * 100}%` }} className="flex bg-spotify" />
      </div>
    </div>
  );
};
