import { Module } from '@nestjs/common';
import { DonationAlertWidgetController } from './donation-alert-widget.controller';
import { DonationAlertWidgetService } from './donation-alert-widget.service';

@Module({
  controllers: [DonationAlertWidgetController],
  providers: [DonationAlertWidgetService]
})
export class DonationAlertWidgetModule {}
