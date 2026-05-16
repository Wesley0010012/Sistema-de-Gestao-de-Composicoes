export type Token = {
  token: string;
  type: string;
  expiresAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};
