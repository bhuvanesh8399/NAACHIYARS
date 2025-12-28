export default function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" className="accent-[#7A1E2C]" />
      {label}
    </label>
  );
}
