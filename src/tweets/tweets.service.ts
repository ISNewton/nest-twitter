import { Inject, Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tweet } from './entities/tweets.entity'
import { Repository } from 'typeorm'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) private tweetRepostory: Repository<Tweet>,
  ) { }
  async getAll() {
    return await this.tweetRepostory.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          username: true,
        },
      },
    })
  }

  async store(data: CreateTweetDto, user: any): Promise<Tweet> {
    return await this.tweetRepostory.save({
      content: data.content,
      user: user.id,
    })
  }
}
