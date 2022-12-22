import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { SocketModule } from 'src/socket/socket.module';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [SocketModule],
  providers: [DonationService, PrismaService],
  controllers: [DonationController]
})
export class DonationModule {}
