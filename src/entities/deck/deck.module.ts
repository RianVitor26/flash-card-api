import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [DeckController],
  providers: [DeckService, PrismaService],
})
export class DeckModule {}
