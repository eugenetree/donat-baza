import { Controller, Get } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { DonationEntity } from './donations.entity';

@Controller('donations')
export class DonationsController {
  constructor(
    private readonly socketService: SocketService,
  ) { }

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

    return new DonationEntity();
  }
}