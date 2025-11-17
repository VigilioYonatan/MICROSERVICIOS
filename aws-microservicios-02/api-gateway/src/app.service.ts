import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('MATH_SERVICE') private mathClient: ClientProxy,
    @Inject('STRING_SERVICE') private strClient: ClientProxy,
  ) {}
  sum(nums: number[]) {
    return lastValueFrom(this.mathClient.send({ cmd: 'sum' }, nums));
  }

  multiply(nums: number[]) {
    return lastValueFrom(this.mathClient.send({ cmd: 'multiply' }, nums));
  }

  concat(arr: string[]) {
    return lastValueFrom(this.strClient.send({ cmd: 'concat' }, arr));
  }

  capitalize(s: string) {
    return lastValueFrom(this.strClient.send({ cmd: 'capitalize' }, s));
  }
}
