import {Module} from '@nestjs/common';
import {EventGateway} from './event.gateway';
import {KafkaModule} from "../kafka/kafka.module";

@Module({
  imports:[KafkaModule],
  providers: [EventGateway]
})
export class EventModule {}
