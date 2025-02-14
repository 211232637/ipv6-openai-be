import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemStatesService } from './system-states.service';
import { SystemState, SystemStateSchema } from './schemas/system-state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SystemState.name, schema: SystemStateSchema }]),
  ],
  providers: [SystemStatesService],
  exports: [SystemStatesService], // ✅ Export the service so other modules can use it
})
export class SystemStatesModule {}