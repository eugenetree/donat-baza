import { Module } from '@nestjs/common';
import { UrlUtils } from './url.utils';

@Module({
  providers: [UrlUtils],
  exports: [UrlUtils],
})
export class UtilsModule { }
