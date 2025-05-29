export function generateOtp() {
  const digits = "0123456789";
  let otp = "";
  for (let index = 0; index < 4; index++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}
