import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DonationEntity } from './donations.entity';
import { CreateDonationParams, UpdateDonationParams } from './donations.service.type';

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
