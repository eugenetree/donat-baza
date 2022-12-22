import { Controller, Get, Post } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';

@Controller('donation')
export class DonationController {
  constructor(
    private readonly socketService: SocketService,
  ) {}

  @Get('success-payment')
  handleSuccessPayment() {
    this.socketService.emitDonationEvent({
      token: 'test-token',
      donation: {
        id: 123,
        amount: 300,
        sender: 'test-sender',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
  }
}
