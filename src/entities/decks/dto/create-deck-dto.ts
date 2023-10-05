export interface CreateDeckDto {
  id: number;
  name: string;
  description?: string;
  category: string;
  ownerId: number;
}
