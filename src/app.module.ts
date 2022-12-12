import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChattingController } from './controller/chatting.controller';
import { ChattingProduceService } from './service/chattingProduce.service';
import { KAFKA_TOKEN } from './common/constants';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [ChattingController],
  providers: [ChattingProduceService],
})
export class AppModule {}
