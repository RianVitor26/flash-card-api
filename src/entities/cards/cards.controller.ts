import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-deck-dto';

@Controller('users/:userId/decks/:deckId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(
    @Body() cardDto: CreateCardDto,
    @Param('userId') userId: number,
    @Param('deckId') deckId: number,
  ) {
    const createdDeck = this.cardsService.create(cardDto, userId, deckId);
    return createdDeck;
  }

  @Get()
  findAll(@Param('userId') userId: number, @Param('deckId') deckId: number) {
    const cards = this.cardsService.findAll(userId, deckId);
    return cards;
  }

  // @Get('/:deckId')
  // findOne(@Param('userId') userId: number, @Param('deckId') deckId: number) {
  //   const deck = this.cardsService.findOne(userId, deckId);
  //   return deck;
  // }

  // @Put('/:deckId')
  // update(
  //   @Param('userId') userId: number,
  //   @Param('deckId') deckId: number,
  //   @Body() deckDto: CreateDeckDto,
  // ) {
  //   const updatedDeck = this.cardsService.update(userId, deckId, deckDto);
  //   return updatedDeck;
  // }

  // @Delete('/:deckId')
  // delete(@Param('userId') userId: number, @Param('deckId') deckId: number) {
  //   this.cardsService.delete(userId, deckId);
  // }
}
