export type User = {
  id: number;
  name?: string | null;
  email: string;
  avatarUrl?: string | null;
  verifiedAt?: Date | null;
  otpCode?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
  authAccounts?: AuthAccount[];
};

export type AuthAccount = {
  id: number;
  userId: number;
  provider: string;
  providerUserId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User | null;
};
