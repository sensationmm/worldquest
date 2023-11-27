export type Theme = 'brand' | 'brand2' | 'brand3' | 'brand4' | 'brand5' | 'brand6';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  lastPlayedAt: Date;
  clueTokens: number;
  theme: Theme;
};
