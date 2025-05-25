import { signupSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const body = await signupSchema.parse(await readBody(event));
  if (body.errors.length) return body.errors;
  return body.value;
});
