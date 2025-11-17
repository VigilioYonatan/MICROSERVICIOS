import { Controller } from '@nestjs/common';
// import { StringService } from './string.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class StringController {
  // constructor(private readonly stringService: StringService) {}

  @MessagePattern({ cmd: 'concat' })
  sum(data: number[]): number {
    // const channel = ctx.getChannelRef();
    // const msg = ctx.getMessage();
    const result = data.reduce((a, b) => a + b, 0);
    // channel.ack(msg);
    return result;
  }

  // @MessagePattern({ cmd: 'concat' })
  // concat(payload: string[]): string {
  //   console.log({ payload });

  //   return payload.join(' ');
  // }

  @MessagePattern({ cmd: 'capitalize' })
  capitalize(payload: string): string {
    return payload.toUpperCase();
  }
}
