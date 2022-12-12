import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
  Producer,
  ProducerRecord,
} from 'kafkajs';
import { KAFKA_TOKEN } from '../common/constants';

@Injectable()
export class ChattingProduceService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka = new Kafka({
    brokers: [KAFKA_TOKEN.brokers],
  });
  private readonly producer: Producer = this.kafka.producer();
  private readonly consumer: Consumer[] = [];

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {}

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
