import { PartialType } from "@nestjs/mapped-types";
import { DonationEntity } from "../donations.entity";

export class UpdateDonationParams extends PartialType(DonationEntity) { }
