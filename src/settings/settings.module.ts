import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import axios from 'axios';
import { validationSchema } from './settings.schemas';
import { SettingsService } from './settings.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validationSchema })],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule implements OnModuleInit {
  constructor(private settingsService: SettingsService) { }

  async onModuleInit() {
    await this.settingsService.init();
  }
}