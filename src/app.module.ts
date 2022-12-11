import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChattingController } from './controller/chatting.controller';
import { ChattingService } from './service/chatting.service';

@Module({
  imports: [],
  controllers: [AppController, ChattingController],
  providers: [AppService, ChattingService],
})
export class AppModule {}
