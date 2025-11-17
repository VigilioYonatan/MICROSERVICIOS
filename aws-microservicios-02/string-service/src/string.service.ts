import { Injectable } from '@nestjs/common';

@Injectable()
export class StringService {
  getHello(): string {
    return 'Hello World!';
  }
}
