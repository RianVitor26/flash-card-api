import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeckDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  category?: string;
}
