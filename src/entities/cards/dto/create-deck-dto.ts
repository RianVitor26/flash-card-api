import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  term: string;
  @ApiProperty()
  translation: string;
  @ApiProperty()
  deckId: number;
  @ApiProperty()
  userId: number;
}
