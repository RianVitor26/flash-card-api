import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.module';
import { CardsModule } from './entities/cards/cards.module';
import { DeckModule } from './entities/deck/deck.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule, CardsModule, DeckModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
