import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChattingConsumeService } from '../service/chattingConsume.service';
import { KAFKA_TOKEN } from '../common/constants';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ChattingConsumeService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: [KAFKA_TOKEN.topic] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
