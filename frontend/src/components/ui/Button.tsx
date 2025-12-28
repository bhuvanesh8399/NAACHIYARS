export default function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full bg-[#7A1E2C] text-white py-3 rounded-xl mt-4">
      {children}
    </button>
  );
}
