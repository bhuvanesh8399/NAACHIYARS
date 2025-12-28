export default function Select({
  label,
  options,
  placeholder,
  value
}: {
  label: string;
  options: string[];
  placeholder?: string;
  value?: string;
}) {
  return (
    <div className="mt-3">
      <label className="text-sm">{label}</label>
      <select className="w-full mt-1 px-4 py-3 rounded-xl border">
        {placeholder && <option>{placeholder}</option>}
        {options.map((o) => (
          <option key={o} selected={o === value}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
