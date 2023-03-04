import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { DonationEntity } from './donations.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { CreateDonationParams } from './types/create-donation.type';
import { UpdateDonationParams } from './types/update-donation.type';

@Injectable()
export class DonationsService {
  constructor(
    private prisma: PrismaService,
  ) { }


  async create(data: CreateDonationParams): Promise<DonationEntity> {
    return this.prisma.donation.create({ data });
  }


  async update(id: number, data: UpdateDonationParams): Promise<DonationEntity> {
    return this.prisma.donation.update({ where: { id }, data: {} })
  }


  // temporary fake solution
  encryptDonationId = (id: number): string => {
    return `${id}`
  }

  // temporary fake solution
  decryptDonationId = (value: string): number => {
    return Number(value);
  }
}
