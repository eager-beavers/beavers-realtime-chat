import { Body, Controller, Post } from '@nestjs/common';
import { ChattingProduceService } from '../service/chattingProduce.service';
import { ChattingConsumeService } from '../service/chattingConsume.service';
import { KAFKA_TOKEN } from '../common/constants';
import { ChattingMessageModel } from '../model/chattingMessage.model';

@Controller()
export class ChattingController {
  constructor(
    private readonly produceService: ChattingProduceService,
    private readonly consumeService: ChattingConsumeService,
  ) {}

  @Post()
  async publishChattingMessage(
    @Body() message: ChattingMessageModel,
  ): Promise<void> {
    await this.produceService.produce({
      topic: KAFKA_TOKEN.topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("POST TSET");
  }
}
