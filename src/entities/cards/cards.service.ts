import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCardDto } from './dto/create-deck-dto';

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(cardDto: CreateCardDto, userId: number, deckId: number) {
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
  }

  async findAll(userId: number, deckId: number) {
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
  }
}
