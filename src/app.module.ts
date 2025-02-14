import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiService } from './openai/openai.service';
import { OpenaiController } from './openai/openai.controller';
import { PlaybooksModule } from './playbooks/playbooks.module';
import { InventoriesModule } from './inventories/inventories.module';
import { PipelinesModule } from './pipelines/pipelines.module';
import { SystemStatesModule } from './system-states/system-states.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration options go here
      // for example, to load .env files:
      isGlobal: true, // Makes the config globally available in your app
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/ipv6'),
    PlaybooksModule,
    InventoriesModule,
    PipelinesModule,
    SystemStatesModule,
  ],
  controllers: [AppController, OpenaiController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
