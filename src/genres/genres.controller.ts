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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiOkResponse({ description: 'Success' })
  findAll() {
    return { genres: this.genresService.findAll() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Genre not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create genre' })
  @ApiCreatedResponse({ description: 'Genre created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() genre: { name: string }) {
    return this.genresService.create(genre);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update genre' })
  @ApiOkResponse({ description: 'Genre updated' })
  @ApiNotFoundResponse({ description: 'Genre not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() genre: { name?: string },
  ) {
    return this.genresService.update(id, genre);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete genre' })
  @ApiOkResponse({ description: 'Genre deleted' })
  @ApiNotFoundResponse({ description: 'Genre not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.delete(id);
  }
}
