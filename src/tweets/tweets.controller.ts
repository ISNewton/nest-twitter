import { Body, Controller, Get, Post, Req, Request, Session, UseGuards } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { AuthGuard } from '@/auth/auth.guard';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './entities/tweets.entity';

@UseGuards(AuthGuard)
@Controller('tweets')
export class TweetsController {
  constructor(
    private readonly tweetsService :TweetsService,
  ) {}

  @Get('/')
  async getAll() {
    return this.tweetsService.getAll()
  }


  @Post('create')
  async creae(@Body() data:CreateTweetDto ,@Request() req):Promise<Tweet> {
    return this.tweetsService.store(data , req.user.user)
  }

}
