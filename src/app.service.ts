import { Injectable } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
