import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck-dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DecksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, deckDto: CreateDeckDto) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    try {
      const decks = await this.prismaService.deck.findMany({
        where: { ownerId: Number(userId) },
        include: {
          cards: true,
        },
      });

      if (!decks) {
        throw new NotFoundException(`Decks not found.`);
      }

      return decks;
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: number, deckId: number) {
    try {
      const deck = await this.prismaService.deck.findUnique({
        where: { id: Number(deckId), ownerId: Number(userId) },
      });

      if (!deck) {
        throw new NotFoundException(
          `Deck with ID ${deckId} not found for User with ID ${userId}.`,
        );
      }

      return deck;
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, deckId: number, deckDto: CreateDeckDto) {
    try {
      const existingDeck = await this.findOne(userId, deckId);

      if (existingDeck) {
        const updatedDeck = await this.prismaService.deck.update({
          where: { id: Number(deckId) },
          data: deckDto,
        });

        return updatedDeck;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: number, deckId: number) {
    try {
      const existingDeck = await this.findOne(userId, deckId);

      if (existingDeck) {
        const relatedCards = await this.prismaService.card.findMany({
          where: { deckId: Number(deckId) },
        });

        if (relatedCards.length > 0) {
          await this.prismaService.card.deleteMany({
            where: { deckId: Number(deckId) },
          });
        }

        await this.prismaService.deck.delete({
          where: { id: Number(deckId) },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
