import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all publishers' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return { publishers: this.publishersService.findAll() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get publisher by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create publisher' })
  @ApiResponse({ status: 201, description: 'Publisher created' })
  create(@Body() publisher: { name: string }) {
    return this.publishersService.create(publisher);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update publisher' })
  @ApiResponse({ status: 200, description: 'Publisher updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() publisher: { name?: string },
  ) {
    return this.publishersService.update(id, publisher);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete publisher' })
  @ApiResponse({ status: 200, description: 'Publisher deleted' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.delete(id);
  }
}
