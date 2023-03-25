import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/database/base.repository";
import { PrismaService } from "src/database/prisma.service";
import { OauthProviderEntity } from "src/oauth-providers/oauth-provider.entity";
import { UserEntity } from "./user.entity";

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
  constructor(private prisma: PrismaService) {
    super(prisma.user, [], []);
  }

  async findOneByOauthProvider({ where }: {
    where: Partial<OauthProviderEntity>
  }) {
    return this.prisma.user.findFirst({
      where: { ouathProviders: { some: where } }
    })
  }
}