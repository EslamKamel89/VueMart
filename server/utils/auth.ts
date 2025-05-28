import { User } from "~/types/db";
export type SanitizedUser = {
  id: number;
  name?: string | null;
  email: string;
  avatarUrl?: String | null;
};
export function sanitizeUser({
  id,
  name,
  email,
  avatarUrl,
}: User): SanitizedUser {
  return { id, name, email, avatarUrl };
}
