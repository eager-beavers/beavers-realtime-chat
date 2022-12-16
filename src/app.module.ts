import {Module} from '@nestjs/common';
import {ChattingController} from './controller/chatting.controller';
import {ChattingProduceService} from './service/chattingProduce.service';
import {KafkaModule} from './kafka/kafka.module';
import {EventModule} from './event/event.module';

@Module({
  imports: [KafkaModule, EventModule],
  controllers: [ChattingController],
  providers: []
})
export class AppModule {}
