import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async findAll(page = 1, limit = 10, search = ''): Promise<{ data: Inventory[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = search ? { description: { $regex: search, $options: 'i' } } : {};
    const data = await this.inventoryModel.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  
    const total = await this.inventoryModel.countDocuments(query).exec();
    return { data, total };
  }

  async findOne(id: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findById(id).exec();
    if (!inventory) throw new NotFoundException('Inventory not found');
    return inventory;
  }

  async update(id: string, updateInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const updatedInventory = await this.inventoryModel
      .findByIdAndUpdate(id, updateInventoryDto, { new: true })
      .exec();
    if (!updatedInventory) throw new NotFoundException('Inventory not found');
    return updatedInventory;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.inventoryModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Inventory not found');
    return { message: 'Inventory deleted successfully' };
  }
}