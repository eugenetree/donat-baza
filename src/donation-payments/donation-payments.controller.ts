import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DonationPaymentsService } from './donation-payments.service';
import { FondyCallbackBodyDto, FondyCallbackQueryDto } from './dto/fondy-callback.dto';
import { DonationPaymentInitDto } from './dto/donation-payment-init.dto';

@Controller('donation-payments')
export class DonationPaymentsController {
  constructor(
    private readonly donationPaymentsService: DonationPaymentsService,
  ) { }

  @Get('init')
  async init(
    @Query() dto: DonationPaymentInitDto,
    @Res() res: Response,
  ) {
    res.redirect(
      await this.donationPaymentsService.createRedirectUrl({
        ...dto,
        callbackUrlPath: 'donation-payments/fondy-callback',
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
