import { Module } from '@nestjs/common';
import { DonationsModule } from 'src/donations/donations.module';
import { UtilsModule } from 'src/utils/utils.module';
import { FondyPaymentsService } from './fondy-payments.service';
import { DonationPaymentsController } from './donation-payments.controller';
import { DonationPaymentsService } from './donation-payments.service';
import { UsersModule } from 'src/users/users.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [DonationsModule, UsersModule, SocketModule, UtilsModule],
  controllers: [DonationPaymentsController],
  providers: [FondyPaymentsService, DonationPaymentsService],
})
export class DonationPaymentsModule {}
