import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { SocketModule } from 'src/socket/socket.module';
import { PrismaService } from 'src/database/prisma.service';
import { UtilsModule } from 'src/utils/utils.module';
import { FondyPaymentsService } from 'src/donation-payments/fondy-payments.service';
import { DonationsRepository } from './donations.repository';

@Module({
  imports: [SocketModule, UtilsModule],
  providers: [
    DonationsService,
    PrismaService,
    FondyPaymentsService,
    DonationsRepository
  ],
  controllers: [DonationsController],
  exports: [DonationsService],
})
export class DonationsModule { }
