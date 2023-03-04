import { Module } from '@nestjs/common';
import { DonationsModule } from 'src/donations/donations.module';
import { UtilsModule } from 'src/utils/utils.module';
import { FondyPaymentsService } from './fondy-payments.service';
import { DonationPaymentsController } from './donation-payments.controller';
import { DonationPaymentsService } from './donation-payments.service';

@Module({
  imports: [DonationsModule, UtilsModule],
  controllers: [DonationPaymentsController],
  providers: [FondyPaymentsService, DonationPaymentsService],
})
export class DonationPaymentsModule {}
