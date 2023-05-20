import { Injectable } from '@nestjs/common';
import { DonationEntity } from './donations.entity';
import { DonationsRepository } from './donations.repository';
import { CreateDonationParams, UpdateDonationParams } from './donations.service.type';
import { SettingsService } from 'src/settings/settings.service';
import * as crypto from "crypto";

@Injectable()
export class DonationsService {
  constructor(
    private donationsRepository: DonationsRepository,
    private settingsService: SettingsService,
  ) { }

  async create(data: CreateDonationParams): Promise<DonationEntity> {
    return this.donationsRepository.create({ data });
  }

  async update(id: number, data: UpdateDonationParams): Promise<DonationEntity> {
    return this.donationsRepository.updateOne({ id, data })
  }

  private initializationVector = crypto.createHash('sha256')
    .update(this.settingsService.getDonationCipherIv())
    .digest().slice(0, 16) // sliced to match 'aes192 requirements'
  
  private cipherKey = crypto.createHash('sha256')
    .update(this.settingsService.getDonationCipherPassphrase())
    .digest().slice(0, 24); // sliced to match 'aes192 requirements'

  encryptDonationId = (id: number): string => {
    const cipher = crypto.createCipheriv('aes192', this.cipherKey, this.initializationVector);
    const encryptedText = Buffer.concat([
      cipher.update(String(id)),
      cipher.final(),
    ]);

    return encryptedText.toString('hex');
  }

  decryptDonationId = (value: string): number => {
    const decipher = crypto.createDecipheriv('aes192', this.cipherKey, this.initializationVector);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(value, 'hex')),
      decipher.final(),
    ]);

    return Number(decryptedText.toString('utf8'));
  }
}
