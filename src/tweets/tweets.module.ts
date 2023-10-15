import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweets.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetsController],
  providers: [TweetsService]
})
export class TweetsModule {}
