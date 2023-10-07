import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.module';
import { CardsModule } from './entities/cards/cards.module';
import { DecksModule } from './entities/decks/decks.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './entities/auth/auth.module';

@Module({
  imports: [UsersModule, CardsModule, DecksModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
