import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appSvc: AppService) {}

  @Post('math/sum')
  sum(@Body() body: number[]) {
    return this.appSvc.sum(body);
  }

  @Post('math/multiply')
  multiply(@Body() body: number[]) {
    return this.appSvc.multiply(body);
  }

  @Post('string/concat')
  concat(@Body() body: string[]) {
    return this.appSvc.concat(body);
  }

  @Get('string/capitalize')
  capitalize(@Query('s') s: string) {
    return this.appSvc.capitalize(s);
  }
}
