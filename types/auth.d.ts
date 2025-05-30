// auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: number;
    name?: string | null;
    email: string;
    avatarUrl?: String | null;
    verifiedAt?: Date | null;
  }

  //   interface UserSession {
  // Add your own fields
  //   }

  //   interface SecureSessionData {
  // Add your own fields
  //   }
}

export {};
