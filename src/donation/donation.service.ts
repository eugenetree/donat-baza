import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DonationEntity } from './donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Injectable()
export class DonationService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createDonationDto: CreateDonationDto): Promise<DonationEntity> {
    return this.prisma.donation.create({ data: createDonationDto });
  }
}
