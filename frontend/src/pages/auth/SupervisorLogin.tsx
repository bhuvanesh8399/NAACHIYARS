import { useState } from "react";
import PhoneFrame from "../../components/layout/PhoneFrame";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import Toast from "../../components/ui/Toast";
import { validatePassword } from "../../utils/validators";

export default function SupervisorLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const submit = () => {
    const err = validatePassword(password);
    setError(err);
    if (!err) {
      alert("Login submit (mock only)");
    }
  };

  return (
    <PhoneFrame>
      <div className="px-6 pt-10 pb-16">
        <div className="text-center mb-6">
          <img src="/logo.png" className="mx-auto h-14 mb-3" />
          <h1 className="text-2xl font-bold text-[#7A1E2C]">NAACHIYARS®</h1>
          <p className="text-sm">Silk | Textiles | Readymade</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <Select label="Role" value="Supervisor" options={["Supervisor"]} />
          <Select
            label="Branch"
            placeholder="Select Branch (Branch 1 / Branch 2)"
            options={["Branch 1", "Branch 2"]}
          />

          <Input label="Mobile Number" placeholder="Enter registered mobile number" />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />

          <div className="flex items-center justify-between text-sm mt-2">
            <Checkbox label="Remember me" />
            <span className="text-[#7A1E2C] cursor-pointer">Forgot password?</span>
          </div>

          <Button onClick={submit}>Sign In</Button>

          <button
            className="w-full mt-3 border rounded-xl py-2 text-sm"
            onClick={() => setShowToast(true)}
          >
            Continue with Google
          </button>
        </div>
      </div>

      {showToast && <Toast message="Coming soon" onClose={() => setShowToast(false)} />}
    </PhoneFrame>
  );
}
