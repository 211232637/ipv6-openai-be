import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { PlaybooksService } from './playbooks.service';
import { CreatePlaybookDto } from './dto/create-playbook.dto';
import { UpdatePlaybookDto } from './dto/update-playbook.dto';

@Controller('api/playbooks')
export class PlaybooksController {
  constructor(private readonly playbooksService: PlaybooksService) {}

  @Post()
  create(@Body() createPlaybookDto: CreatePlaybookDto) {
    return this.playbooksService.create(createPlaybookDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return this.playbooksService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playbooksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlaybookDto: UpdatePlaybookDto) {
    return this.playbooksService.update(id, updatePlaybookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playbooksService.remove(id);
  }

  @Get('/count')
  count() {
    return this.playbooksService.count();
  }
}