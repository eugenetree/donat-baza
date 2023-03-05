import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './settings.schemas';
import { SettingsService } from './settings.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validationSchema })],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule { }