import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SettingsService } from './settings.types';
import { BaseSettingsService } from './settings.service';
import { validationSchema } from './settings.schemas';

const shared = [
  {
    provide: SettingsService,
    useClass: BaseSettingsService,
  }
]

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validationSchema })],
  providers: shared,
  exports: shared,
})
export class SettingsModule { }