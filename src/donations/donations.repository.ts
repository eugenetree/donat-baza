import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/database/base.repository";
import { PrismaService } from "src/database/prisma.service";
import { DonationEntity } from "./donations.entity";

// type DonationsRepository = BaseRepository<DonationEntity>

@Injectable()
export class DonationsRepository extends BaseRepository<DonationEntity, ['paymentData'], ['paymentStatus']> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.donation, ['paymentData'], ['paymentStatus'])
  }
}