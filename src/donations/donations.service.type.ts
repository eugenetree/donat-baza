import { PartialType } from "@nestjs/mapped-types";
import { DonationEntity } from "./donations.entity";
import { CreateDonationDto } from "./dto/create-donation.dto";

export class CreateDonationParams extends CreateDonationDto { }

export class UpdateDonationParams extends PartialType(DonationEntity) { }
