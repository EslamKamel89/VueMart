export type User = {
  id: number;
  name?: string | null;
  email: string;
  avatarUrl?: String | null;
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
