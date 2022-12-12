import { Module } from '@nestjs/common';
import { ChattingProduceService } from '../service/chattingProduce.service';
import { ChattingConsumeService } from '../service/chattingConsume.service';

@Module({
  providers: [ChattingProduceService, ChattingConsumeService],
  exports: [ChattingProduceService, ChattingConsumeService],
})
export class KafkaModule {}
