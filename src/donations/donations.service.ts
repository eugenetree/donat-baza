import { Injectable } from '@nestjs/common';
import { DonationEntity } from './donations.entity';
import { DonationsRepository } from './donations.repository';
import { CreateDonationParams, UpdateDonationParams } from './donations.service.type';
import { SettingsService } from 'src/settings/settings.service';

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
}
