import { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center bg-neutral-100">
      <div className="w-full max-w-[420px] bg-[#FFF7EE] min-h-screen overflow-y-auto shadow-md">
        {children}
      </div>
    </div>
  );
}
