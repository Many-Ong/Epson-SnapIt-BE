import { Module } from '@nestjs/common';
import { EpsonService } from './epson.service';
import { EpsonController } from './epson.controller';

@Module({
  imports: [],
  providers: [EpsonService],
  exports: [EpsonService],
  controllers: [EpsonController],
})
export class EpsonModule {}
