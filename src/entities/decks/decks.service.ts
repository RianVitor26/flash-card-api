import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck-dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DecksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, deckDto: CreateDeckDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const createdDeck = await this.prismaService.deck.create({
      data: {
        ...deckDto,
        ownerId: user.id,
      },
    });

    return createdDeck;
  }

  async findAll(userId: number) {
    const decks = await this.prismaService.deck.findMany({
      where: { ownerId: Number(userId) },
    });

    if (!decks) {
      throw new NotFoundException(`Decks not found.`);
    }

    return decks;
  }

  async findOne(userId: number, deckId: number) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: Number(deckId), ownerId: Number(userId) },
    });

    if (!deck) {
      throw new NotFoundException(
        `Deck with ID ${deckId} not found for User with ID ${userId}.`,
      );
    }

    return deck;
  }

  async update(userId: number, deckId: number, deckDto: CreateDeckDto) {
    const existingDeck = await this.findOne(userId, deckId);

    if (existingDeck) {
      const updatedDeck = await this.prismaService.deck.update({
        where: { id: Number(deckId) },
        data: deckDto,
      });

      return updatedDeck;
    }
  }

  async delete(userId: number, deckId: number) {
    const existingDeck = await this.findOne(userId, deckId);

    if (existingDeck) {
      await this.prismaService.deck.delete({
        where: { id: Number(deckId) },
      });
    }
  }
}
