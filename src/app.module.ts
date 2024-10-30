import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAiModule } from './google-ai/google-ai.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GoogleAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
