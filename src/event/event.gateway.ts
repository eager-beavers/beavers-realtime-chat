import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { ChattingConsumeService } from '../service/chattingConsume.service';
import { KAFKA_TOKEN } from '../common/constants';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly consumerService: ChattingConsumeService) {}

  private logger = new Logger('Gateway');

  @WebSocketServer() nsp: Namespace;

  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      this.logger.log(`"Room:${room}"이 생성되었습니다.`);
    });

    this.nsp.adapter.on('join-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });

    this.nsp.adapter.on('leave-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.nsp.adapter.on('delete-room', (roomName) => {
      this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });

    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결`);

    socket.broadcast.emit('c', {
      message: `${socket.id}가 들어왔습니다.`,
    });

    await this.consumerService.consume(
      { topics: [KAFKA_TOKEN.topic] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          this.logger.log(JSON.parse(message.value.toString()));
          socket.broadcast.emit('message', JSON.parse(message.value.toString()));
        },
      },
    );
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: string,
  ) {
    socket.broadcast.emit('message', { username: socket.id, message });
    return { username: socket.id, message };
  }
}
