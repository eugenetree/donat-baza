import { Injectable } from '@nestjs/common';
import { DonationEntity } from './donations.entity';
import { DonationsRepository } from './donations.repository';
import { CreateDonationParams, UpdateDonationParams } from './donations.service.type';
import * as crypto from "crypto";

@Injectable()
export class DonationsService {
  constructor(
    private donationsRepository: DonationsRepository,
  ) { }


  async create(data: CreateDonationParams): Promise<DonationEntity> {
    return this.donationsRepository.create({ data });
  }


  async update(id: number, data: UpdateDonationParams): Promise<DonationEntity> {
    return this.donationsRepository.updateOne({ id, data })
  }


  // temporary fake solution
  encryptDonationId = (id: number): string => {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(96);
    console.log('key', key);
    console.log('iv', iv);
    console.log(crypto.createCipheriv('aes-256-gcm', key, iv)); 
    return `${id}`
  }

  // temporary fake solution
  decryptDonationId = (value: string): number => {
    return Number(value);
  }
}
