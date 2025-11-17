import { Module } from '@nestjs/common';
import { StringController } from './string.controller';

@Module({
  imports: [],
  controllers: [StringController],
  // providers: [StringService],
})
export class StringModule {}
