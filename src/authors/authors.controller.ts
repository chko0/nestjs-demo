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
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return { authors: this.authorsService.findAll() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create author' })
  @ApiResponse({ status: 201, description: 'Author created' })
  create(@Body() author: { name: string; email: string }) {
    return this.authorsService.create(author);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update author' })
  @ApiResponse({ status: 200, description: 'Author updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(id, authorUpdate);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete author' })
  @ApiResponse({ status: 200, description: 'Author deleted' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.delete(id);
  }
}
