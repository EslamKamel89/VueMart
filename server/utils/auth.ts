import { User } from "~/types/db";
export type SanitizedUser = {
  id: number;
  name?: string | null;
  email: string;
  avatarUrl?: String | null;
  verifiedAt?: Date | null;
};
export function sanitizeUser({
  id,
  name,
  email,
  avatarUrl,
  verifiedAt,
}: User): SanitizedUser {
  return { id, name, email, avatarUrl, verifiedAt };
}
