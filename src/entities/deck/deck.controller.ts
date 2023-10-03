import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck-dto';

@Controller('users/:userId/decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  create(@Body() deckDto: CreateDeckDto, @Param('userId') userId: number) {
    const createdDeck = this.deckService.create(userId, deckDto);
    return createdDeck;
  }

  @Get()
  findAll(@Param('userId') userId: number) {
    const decks = this.deckService.findAll(userId);
    return decks;
  }

  @Get('/:deckId')
  findOne(@Param('userId') userId: number, @Param('deckId') deckId: number) {
    const deck = this.deckService.findOne(userId, deckId);
    return deck;
  }

  @Put('/:deckId')
  update(
    @Param('userId') userId: number,
    @Param('deckId') deckId: number,
    @Body() deckDto: CreateDeckDto,
  ) {
    const updatedDeck = this.deckService.update(userId, deckId, deckDto);
    return updatedDeck;
  }

  @Delete('/:deckId')
  delete(@Param('userId') userId: number, @Param('deckId') deckId: number) {
    this.deckService.delete(userId, deckId);
  }
}
