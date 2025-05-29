import { pr } from "~/utils/helpers";

export async function sendVerficiationEmail(to: string, otp: string) {
  sendMail({
    subject: "Email verification",
    text: `Use this code to verify your email address:  ${otp}  `,
    to,
  });
}
export async function sendMail(options: {
  subject: string;
  text: string;
  to: string;
}) {
  const { sendMail } = useNodeMailer();

  const result = await sendMail({
    ...options,
    to: "eslamkamelforex@gmail.com",
  });
  pr(result, "Main send result");
}
