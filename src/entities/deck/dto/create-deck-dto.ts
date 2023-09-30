export interface CreateDeckDto {
  userId: number;
  name: string;
  description?: string;
  category: string;
}
