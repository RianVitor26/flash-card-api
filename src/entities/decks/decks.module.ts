import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [DecksController],
  providers: [DecksService, PrismaService],
})
export class DecksModule {}
