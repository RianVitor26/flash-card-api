import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.module';
import { CardsModule } from './entities/cards/cards.module';
import { DecksModule } from './entities/decks/decks.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule, CardsModule, DecksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
