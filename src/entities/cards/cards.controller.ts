import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-deck-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDeckDto } from '../decks/dto/create-deck-dto';

@ApiTags('cards')
@Controller('users/:userId/decks/:deckId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({
    summary: 'create a card for a deck from a user',
  })
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

  // @Get('/:cardId')
  // findOne(@Param('userId') userId: number, @Param('cardId') cardId: number) {
  //   const deck = this.cardsService.findOne(userId, cardId);
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
  //   this.cardsService.remove(userId, deckId);
  // }
}
