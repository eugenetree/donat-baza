import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  async error(message: string) {
    console.log(`error happened: ${message}`);
  }
}
