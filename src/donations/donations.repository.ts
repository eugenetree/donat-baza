import { Prisma, PrismaClient } from "@prisma/client";
import { BaseRepository } from "src/database/base.repository";
import { PrismaService } from "src/database/prisma.service";
import { DonationEntity } from "./donations.entity";
import { produce } from "immer";
import { BaseEntity } from "src/database/base.entity";

// type DonationsRepository = BaseRepository<DonationEntity>

export class DonationsRepository extends BaseRepository<DonationEntity, ['paymentData'], ['paymentStatus']> {
  constructor() {
    super(new PrismaClient().donation, ['paymentData'], ['paymentStatus'])
  }
}

