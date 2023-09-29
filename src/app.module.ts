import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { CardsModule } from './entities/cards/cards.module';
import { DeckModule } from './entities/deck/deck.module';
import { AuthModule } from './entities/auth/auth.module';

@Module({
  imports: [UsersModule, CardsModule, DeckModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
