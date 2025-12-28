export default function Input({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
  [key: string]: any;
}) {
  return (
    <div className="mt-3">
      <label className="text-sm">{label}</label>
      <input {...props} className="w-full mt-1 px-4 py-3 rounded-xl border focus:outline-none" />
      <p className="text-xs text-red-600 min-h-[16px]">{error}</p>
    </div>
  );
}
