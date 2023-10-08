import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty()
  term?: string;
  @ApiProperty()
  translation?: string;
}
