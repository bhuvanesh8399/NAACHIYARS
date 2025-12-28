export function validatePassword(pwd: string) {
  if (!/^(?=.{6,30}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\.).*$/.test(pwd)) {
    return "Password must contain uppercase, lowercase, dot and be 6–30 chars";
  }
  return "";
}
