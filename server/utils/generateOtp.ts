export function generateOtp(length: number) {
  const digits = "0123456789";
  let otp = "";
  for (let index = 0; index < length; index++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}
