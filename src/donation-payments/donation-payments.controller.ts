import { Body, Controller, Get, HttpCode, Post, Query, Res } from '@nestjs/common';
import {  Response } from 'express';
import { DonationPaymentsService } from './donation-payments.service';
import { FondyCallbackQueryDto } from './dto/fondy-callback.dto';
import { DonationPaymentInitDto } from './dto/donation-payment-init.dto';
import { PAYMENT_SYSTEMS, PAYMENT_SYSTEMS_CALLBACK_URL_PATHS } from './donation-payments.constants';

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
    const redirectUrl = await this.donationPaymentsService.createRedirectUrlToPaymentPage({
      donationInput,
      redirectUrlAfterPayment,
    })

    console.log('DonationPaymentsController | init donation, redirecting to payment page: ', redirectUrl);
    res.redirect(redirectUrl);
  }

  @Post(PAYMENT_SYSTEMS_CALLBACK_URL_PATHS[PAYMENT_SYSTEMS.FONDY])
  // 200 code is needed because of 'fondy' requirements
  @HttpCode(200)
  handleFondyCallback(
    @Body() data, // TODO: add pipe for check data is valid JSON
    @Query() { id }: FondyCallbackQueryDto,
  ) {
    this.donationPaymentsService.handleSuccessDonationPayment({
      id,
      paymentData: data
    })
  }
}