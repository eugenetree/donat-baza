import { Injectable } from "@nestjs/common";
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  public server: Server;

  constructor() { }
 
  emitDonationEvent({ token, donation }: { token: string; donation: unknown }) {
    console.log('emitting to ', `room/${token}`);
    this.server.to(`room/${token}`).emit('DONATION_RECEIVED', donation);
  }
}