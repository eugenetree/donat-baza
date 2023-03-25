import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/database/base.repository";
import { PrismaService } from "src/database/prisma.service";
import { OauthProviderEntity } from "./oauth-provider.entity";

@Injectable()
export class OauthProvidersRepository extends BaseRepository<OauthProviderEntity> {
  constructor(private prisma: PrismaService) {
    super(prisma.oauthProvider, [], []);
  }
}