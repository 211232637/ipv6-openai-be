import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemState, SystemStateDocument } from './schemas/system-state.schema';

@Injectable()
export class SystemStatesService {
  constructor(
    @InjectModel(SystemState.name) private systemStateModel: Model<SystemStateDocument>,
  ) {}

  async getState(): Promise<SystemState> {
    let state = await this.systemStateModel.findOne().exec();

    if (!state) {
      state = new this.systemStateModel();
      await state.save();
    }

    return state;
  }

  async updateState(newVersion: string, newTag: string): Promise<SystemState> {
    let state = await this.systemStateModel.findOne().exec();

    if (!state) {
      state = new this.systemStateModel({ lastVersion: newVersion, lastTag: newTag });
    } else {
      state.lastVersion = newVersion;
      state.lastTag = newTag;
    }

    return state.save();
  }

  incrementVersion(version: string): string {
    const parts = version.split('.').map(Number);
    if (parts.length !== 3) throw new Error('Invalid version format');

    let [major, minor, patch] = parts;

    if (patch < 99) {
      patch++;
    } else {
      patch = 0;
      if (minor < 99) {
        minor++;
      } else {
        minor = 0;
        major++; // Increment major if minor reaches 99
      }
    }

    return `${major}.${minor}.${patch}`;
  }

  incrementTag(tag: string): string {
    const number = parseInt(tag.replace(/\D/g, ''), 10); // Extract numeric part
    const prefix = tag.replace(/[0-9]/g, ''); // Extract non-numeric prefix

    const newNumber = number + 1;
    const paddedNumber = newNumber.toString().padStart(4, '0'); // Ensure 4-digit format

    return `${prefix}${paddedNumber}`;
  }
}