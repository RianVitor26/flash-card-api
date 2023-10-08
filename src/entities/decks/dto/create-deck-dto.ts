import { ApiProperty } from '@nestjs/swagger';

export class CreateDeckDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  ownerId: number;
}
