import { Injectable } from '@nestjs/common';
import { ChattingMessageModel } from '../model/chattingMessage.model';

@Injectable()
export class ChattingService {
  //Client post 요청으로 받은 메세지 kafka에 pub
  publishMessage(message: ChattingMessageModel): void {}

  //kafka에 pub되면 linking 되어있는 client들이 sub
  subscribeMessage(): ChattingMessageModel {
    return;
  }
}
