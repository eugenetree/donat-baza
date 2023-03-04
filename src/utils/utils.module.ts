import { Module } from '@nestjs/common';
import { UrlUtils } from './url.types';
import { BaseUrlUtils } from './url.utils';

const shared = [
  {
    provide: UrlUtils,
    useClass: BaseUrlUtils,
  },
]

@Module({
  providers: shared,
  exports: shared,
})
export class UtilsModule { }
