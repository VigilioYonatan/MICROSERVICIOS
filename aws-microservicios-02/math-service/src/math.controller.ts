import { Controller } from '@nestjs/common';
import { MathService } from './math.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class MathController {
  constructor(private readonly mathService: MathService) {}

  // NATS Y TCP
  // @MessagePattern({ cmd: 'sum' })
  // sum(data: number[]): number {
  //   return data.reduce((a, b) => a + b, 0);
  // }
  @MessagePattern({ cmd: 'sum' })
  sum(@Ctx() ctx: RmqContext, data: number[]): number {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();
    const result = data.reduce((a, b) => a + b, 0);
    channel.ack(msg);
    return result;
  }

  @MessagePattern({ cmd: 'multiply' })
  multiply(data: number[]): number {
    return data.reduce((a, b) => a * b, 0);
  }
}
