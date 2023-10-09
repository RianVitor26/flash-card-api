import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-deck-dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCardDto } from './dto/update-deck-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cards')
@Controller('users/:userId/decks/:deckId/cards')
@UseGuards(AuthGuard('jwt'))
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiBody({ type: CreateCardDto })
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({ status: 201, description: 'Card created successfully' })
  @Post()
  create(
    @Body() cardDto: CreateCardDto,
    @Param('userId') userId: number,
    @Param('deckId') deckId: number,
  ) {
    const createdDeck = this.cardsService.create(cardDto, userId, deckId);
    return createdDeck;
  }

  @ApiOperation({ summary: 'Find all cards' })
  @ApiResponse({ status: 200, description: 'Cards found successfully' })
  @Get()
  findAll(@Param('userId') userId: number, @Param('deckId') deckId: number) {
    const cards = this.cardsService.findAll(userId, deckId);
    return cards;
  }

  @ApiBody({ type: UpdateCardDto })
  @ApiOperation({ summary: 'Find one card' })
  @ApiResponse({ status: 200, description: 'Card found successfully' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiParam({
    name: 'deckId',
    description: 'Deck ID',
  })
  @ApiParam({
    name: 'cardId',
    description: 'Card ID',
  })
  @Get('/:cardId')
  findOne(
    @Param('userId') userId: number,
    @Param('deckId') deckId: number,
    @Param('cardId') cardId: number,
  ) {
    const cards = this.cardsService.findOne(userId, deckId, cardId);
    return cards;
  }

  @ApiOperation({ summary: 'Update one card' })
  @ApiResponse({ status: 200, description: 'Card updated successfully' })
  @ApiParam({
    name: 'cardId',
    description: 'Card ID',
  })
  @ApiParam({
    name: 'deckId',
    description: 'Deck ID',
  })
  @Put('/:cardId')
  update(
    @Body() cardDto: CreateCardDto,
    @Param('deckId') deckId: number,
    @Param('cardId') cardId: number,
  ) {
    const updatedDeck = this.cardsService.update(cardDto, deckId, cardId);
    return updatedDeck;
  }

  @ApiOperation({ summary: 'Delete one card' })
  @ApiResponse({ status: 204, description: 'Card deleted successfully' })
  @ApiParam({
    name: 'cardID',
    description: 'Card ID',
  })
  @ApiParam({
    name: 'deckId',
    description: 'Deck ID',
  })
  @Delete('/:cardId')
  delete(@Param('deckId') deckId: number, @Param('cardId') cardId: number) {
    this.cardsService.remove(deckId, cardId);
  }
}
