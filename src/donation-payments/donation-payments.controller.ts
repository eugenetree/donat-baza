import { Body, Controller, Get, HttpCode, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DonationPaymentsService } from './donation-payments.service';
import { FondyCallbackBodyDto, FondyCallbackQueryDto } from './dto/fondy-callback.dto';
import { DonationPaymentInitDto } from './dto/donation-payment-init.dto';

@Controller('donation-payments')
export class DonationPaymentsController implements DonationPaymentsController {
  constructor(
    private readonly donationPaymentsService: DonationPaymentsService,
  ) { }

  @Get('init')
  async init(
    @Query() dto: DonationPaymentInitDto,
    @Res() res: Response,
  ) {
    const { redirectUrlAfterPayment, ...donationInput } = dto;

    res.redirect(
      await this.donationPaymentsService.createRedirectUrlToPaymentPage({
        donationInput,
        redirectUrlAfterPayment,
        callbackUrlPathAfterPayment: 'donation-payments/fondy-callback',
      })
    );
  }

  @Post('fondy-callback')
  // 200 code is needed because of 'fondy' requirements
  @HttpCode(200)
  handleFondyCallback(
    @Body() data: FondyCallbackBodyDto,
    @Query() { id }: FondyCallbackQueryDto,
  ) {
    console.log(data, id);
  }
}