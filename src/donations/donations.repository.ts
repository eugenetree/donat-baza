import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/database/base.repository";
import { PrismaService } from "src/database/prisma.service";
import { DonationEntity, DonationEntityFieldsWithDefaultValue } from "./donations.entity";

@Injectable()
export class DonationsRepository extends BaseRepository<DonationEntity, ['paymentData'], typeof DonationEntityFieldsWithDefaultValue> {
  constructor(private prisma: PrismaService) {
    super(prisma.donation, ['paymentData'], DonationEntityFieldsWithDefaultValue)
  }
}