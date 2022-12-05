// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "src/database/prisma.service";
// import { CreateUserWithOuathDto } from "src/users/user.dto";
// import { UserEntity } from "src/users/user.entity";
// import { OauthProviderEntity } from "./oauth-provider.entity";
// import { FindOauthProdiverDto } from "./oauth-providers.dto";

// @Injectable()
// export class OauthProvidersRepository {
//   constructor(
//     private readonly prisma: PrismaService,
//   ) { }

//   public find = async (dto: FindOauthProdiverDto): Promise<OauthProviderEntity | null> => {
//     return this.prisma.oauthProvider.findFirst({
//       where: {
//         ...dto
//       }
//     })
//   }
// }