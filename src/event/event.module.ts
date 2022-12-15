import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { ChattingConsumeService } from '../service/chattingConsume.service';

@Module({
  providers: [EventGateway, ChattingConsumeService],
})
export class EventModule {}
