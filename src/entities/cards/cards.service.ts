import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCardDto } from './dto/create-deck-dto';

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(cardDto: CreateCardDto, userId: number, deckId: number) {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      const deckExists = await this.prismaService.deck.findUnique({
        where: {
          id: Number(deckId),
        },
      });

      if (!deckExists) {
        throw new NotFoundException('Deck not found');
      }

      const createdCard = await this.prismaService.card.create({
        data: {
          term: cardDto.term,
          translation: cardDto.translation,
          deck: {
            connect: {
              id: Number(deckId),
            },
          },
        },
      });

      return createdCard;
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number, deckId: number) {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      const deckExists = await this.prismaService.deck.findUnique({
        where: {
          id: Number(deckId),
        },
      });

      if (!deckExists) {
        throw new NotFoundException('Deck not found');
      }

      const cards = await this.prismaService.card.findMany({
        where: {
          deckId: Number(deckId),
        },
      });

      return cards;
    } catch (error) {
      throw error;
    }
  }

  async findOne(cardId: number) {
    try {
      const card = await this.prismaService.card.findUnique({
        where: {
          id: Number(cardId),
        },
      });

      if (!card) {
        throw new NotFoundException('Card not found');
      }

      return card;
    } catch (error) {
      throw error;
    }
  }

  async update(cardId: number, cardDto: CreateCardDto, deckId: number) {
    try {
      const cardExists = await this.prismaService.card.findUnique({
        where: {
          id: Number(cardId),
          deck: {
            id: Number(deckId),
          },
        },
      });

      if (!cardExists) {
        throw new NotFoundException('Card not found in the specified deck');
      }

      const updatedCard = await this.prismaService.card.update({
        where: {
          id: Number(cardId),
        },
        data: cardDto,
      });

      return updatedCard;
    } catch (error) {
      throw error;
    }
  }

  async remove(cardId: number, deckId: number) {
    try {
      const cardExists = await this.prismaService.card.findUnique({
        where: {
          id: Number(cardId),
          deck: {
            id: Number(deckId),
          },
        },
      });

      if (!cardExists) {
        throw new NotFoundException('Card not found in the specified deck');
      }

      await this.prismaService.card.delete({
        where: {
          id: Number(cardId),
        },
      });

      return { message: 'Card deleted' };
    } catch (error) {
      throw error;
    }
  }
}
