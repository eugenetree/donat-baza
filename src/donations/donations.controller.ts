import { Controller, Get } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { DonationEntity } from './donations.entity';
import { DonationsService } from './donations.service';

@Controller('donations')
export class DonationsController {
  constructor(
    private readonly socketService: SocketService,
    private readonly donationsService: DonationsService,
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

  @Get('t')
  t() {
    this.donationsService.create({ amount: 1, currency: 'UAH', message: 'xxx', paymentSystem: 'fondy', recipientId: 1, senderName: 'me' })
  }
}
