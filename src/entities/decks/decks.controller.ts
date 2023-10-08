import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck-dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Decks')
@Controller('users/:userId/decks')
export class DecksController {
  constructor(private readonly deckService: DecksService) {}

  @ApiBody({ type: CreateDeckDto })
  @ApiOperation({ summary: 'Create a new deck' })
  @ApiResponse({ status: 201, description: 'Deck created successfully' })
  @Post()
  create(@Body() deckDto: CreateDeckDto, @Param('userId') userId: number) {
    const createdDeck = this.deckService.create(userId, deckDto);
    return createdDeck;
  }

  @ApiOperation({ summary: 'Find all decks' })
  @ApiResponse({ status: 200, description: 'Decks found successfully' })
  @Get()
  findAll(@Param('userId') userId: number) {
    const decks = this.deckService.findAll(userId);
    return decks;
  }

  @ApiOperation({ summary: 'Find one deck' })
  @ApiResponse({ status: 200, description: 'Deck found successfully' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiParam({
    name: 'deckId',
    description: 'Deck ID',
  })
  @Get('/:deckId')
  findOne(@Param('userId') userId: number, @Param('deckId') deckId: number) {
    const deck = this.deckService.findOne(userId, deckId);
    return deck;
  }

  @ApiOperation({ summary: 'Update one deck' })
  @ApiResponse({ status: 200, description: 'Deck updated successfully' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiParam({
    name: 'deckId',
    description: 'Deck ID',
  })
  @Put('/:deckId')
  update(
    @Param('userId') userId: number,
    @Param('deckId') deckId: number,
    @Body() deckDto: CreateDeckDto,
  ) {
    const updatedDeck = this.deckService.update(userId, deckId, deckDto);
    return updatedDeck;
  }

  @ApiOperation({ summary: 'Delete one deck' })
  @ApiResponse({ status: 204, description: 'Deck deleted successfully' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiParam({
    name: 'deckId',
    description: 'Deck ID',
  })
  @Delete('/:deckId')
  delete(@Param('userId') userId: number, @Param('deckId') deckId: number) {
    this.deckService.delete(userId, deckId);
  }
}
