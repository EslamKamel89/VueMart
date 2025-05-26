export type User = {
  id: number;
  name: string | null;
  email: string;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  accounts?: Account[];
};
export type Account = {
  type: string;
  id: number;
  userId: number;
  provider: string;
  providerAccountId: string;
  refereshToken: string | null;
  accessToken: string | null;
  expiresAt: number | null;
  tokenType: string | null;
  scope: string | null;
  idToken: string | null;
  sessionState: string | null;
};
