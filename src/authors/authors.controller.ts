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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiOkResponse({ description: 'Success' })
  findAll() {
    return { authors: this.authorsService.findAll() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Author not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create author' })
  @ApiCreatedResponse({ description: 'Author created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() author: { name: string; email: string }) {
    return this.authorsService.create(author);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update author' })
  @ApiOkResponse({ description: 'Author updated' })
  @ApiNotFoundResponse({ description: 'Author not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(id, authorUpdate);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete author' })
  @ApiOkResponse({ description: 'Author deleted' })
  @ApiNotFoundResponse({ description: 'Author not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.delete(id);
  }
}
