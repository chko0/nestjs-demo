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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all publishers' })
  @ApiOkResponse({ description: 'Success' })
  findAll() {
    return { publishers: this.publishersService.findAll() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get publisher by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Publisher not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create publisher' })
  @ApiCreatedResponse({ description: 'Publisher created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() publisher: { name: string }) {
    return this.publishersService.create(publisher);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update publisher' })
  @ApiOkResponse({ description: 'Publisher updated' })
  @ApiNotFoundResponse({ description: 'Publisher not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() publisher: { name?: string },
  ) {
    return this.publishersService.update(id, publisher);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete publisher' })
  @ApiOkResponse({ description: 'Publisher deleted' })
  @ApiNotFoundResponse({ description: 'Publisher not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.delete(id);
  }
}
