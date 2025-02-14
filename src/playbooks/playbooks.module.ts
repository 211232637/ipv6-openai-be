import { Module } from '@nestjs/common';
import { PlaybooksService } from './playbooks.service';
import { PlaybooksController } from './playbooks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playbook, PlaybookSchema } from './schemas/playbook.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Playbook.name, schema: PlaybookSchema }])],
  controllers: [PlaybooksController],
  providers: [PlaybooksService],
  exports: [PlaybooksService],
})
export class PlaybooksModule {}
