import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { IsJsonable } from 'src/common/class-validator/json-validation';
import { JsonValue } from 'src/common/types';
import { SocketService } from 'src/socket/socket.service';

class TestDto {
  @IsJsonable()
  test: JsonValue;
}

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
  }
}
