// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "src/database/prisma.service";
// import { CreateOauthProviderDto } from "src/oauth-providers/oauth-providers.dto";
// import { CreateUserWithOuathDto } from "./user.dto";
// import { UserEntity } from "./user.entity";

// @Injectable()
// export class UsersRepository {
//   constructor(
//     private readonly prisma: PrismaService,
//   ) { }

//   public createWithOauth = async (dto: CreateUserWithOuathDto): Promise<UserEntity> => {
//     const { oauthProviderProfileId, ...baseDto } = dto;

//     return this.prisma.user.create({
//       data: {
//         ouathProviders: {
//           create: {
//             ...baseDto,
//             profileId: oauthProviderProfileId,
//           },
//         }
//       }
//     })
//   }
// }