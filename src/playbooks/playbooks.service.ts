import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaybookDto } from './dto/create-playbook.dto';
import { UpdatePlaybookDto } from './dto/update-playbook.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playbook, PlaybookDocument } from './schemas/playbook.schema';

@Injectable()
export class PlaybooksService {
  constructor(
    @InjectModel(Playbook.name) private playbookModel: Model<PlaybookDocument>,
  ) {}

  /**
   * Create a new playbook
   */
  async create(createPlaybookDto: CreatePlaybookDto): Promise<Playbook> {
    const createdPlaybook = new this.playbookModel(createPlaybookDto);
    return createdPlaybook.save();
  }

  /**
   * Get all playbooks with optional pagination and search
   */
  async findAll(page = 1, limit = 10, search = ''): Promise<{ data: Playbook[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = search ? { description: { $regex: search, $options: 'i' } } : {};
    const data = await this.playbookModel.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  
    const total = await this.playbookModel.countDocuments(query).exec();
    return { data, total };
  }

  /**
   * Get a playbook by ID
   */
  async findOne(id: string): Promise<Playbook> {
    const playbook = await this.playbookModel.findById(id).exec();
    if (!playbook) {
      throw new NotFoundException(`Playbook with ID ${id} not found`);
    }
    return playbook;
  }

  /**
   * Update a playbook by ID
   */
  async update(id: string, updatePlaybookDto: UpdatePlaybookDto): Promise<Playbook> {
    const updatedPlaybook = await this.playbookModel.findByIdAndUpdate(
      id,
      updatePlaybookDto,
      { new: true, runValidators: true },
    ).exec();

    if (!updatedPlaybook) {
      throw new NotFoundException(`Playbook with ID ${id} not found`);
    }
    return updatedPlaybook;
  }

  /**
   * Delete a playbook by ID
   */
  async remove(id: string): Promise<{ message: string }> {
    const deletedPlaybook = await this.playbookModel.findByIdAndDelete(id).exec();
    if (!deletedPlaybook) {
      throw new NotFoundException(`Playbook with ID ${id} not found`);
    }
    return { message: `Playbook with ID ${id} deleted successfully` };
  }

  /**
   * Get the total count of playbooks
   */
  async count(): Promise<number> {
    return this.playbookModel.countDocuments().exec();
  }
}