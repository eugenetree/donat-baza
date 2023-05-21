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

  @Get('test')
  test() {
  }
}
