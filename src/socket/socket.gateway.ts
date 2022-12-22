import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Client } from 'socket.io/dist/client';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class SocketGateway {
  constructor(
    private socketService: SocketService
  ) { }

  @WebSocketServer() 
  public server: Server;

  afterInit(server: Server) {
    this.socketService.server = server;
  }

  @SubscribeMessage('join-donation-room')
  joinDonationRoom(socket: Socket, data: string) {
    console.log(data);
    socket.join(`room/${data}`);
  }
}
