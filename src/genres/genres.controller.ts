import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return { genres: this.genresService.findAll() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create genre' })
  @ApiResponse({ status: 201, description: 'Genre created' })
  create(@Body() genre: { name: string }) {
    return this.genresService.create(genre);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update genre' })
  @ApiResponse({ status: 200, description: 'Genre updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() genre: { name?: string },
  ) {
    return this.genresService.update(id, genre);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete genre' })
  @ApiResponse({ status: 200, description: 'Genre deleted' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.delete(id);
  }
}
