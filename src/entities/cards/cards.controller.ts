import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-deck-dto copy';

@Controller('users/:userId/decks/:deckId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() cardkDto: CreateCardDto, @Param('userId') userId: number) {
    const createdDeck = this.cardsService.create(userId, cardkDto);
    return createdDeck;
  }

  Get()
  findAll(){
    
  }
}
