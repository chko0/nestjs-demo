import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import {
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ description: 'Success' })
  @ApiQuery({
    name: 'includeAuthor',
    required: false,
    description: 'Include author details in the response',
    type: Boolean,
  })
  findAll(@Query('includeAuthor') includeAuthor: string) {
    return { books: this.booksService.findAll(includeAuthor === 'true') };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create book' })
  @ApiCreatedResponse({ description: 'Book created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(
    @Body()
    book: {
      title: string;
      authorId: number;
      publisherId: number;
      genresId: number[];
    },
  ) {
    return this.booksService.create(book);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book' })
  @ApiOkResponse({ description: 'Book updated' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    bookUpdate: {
      name?: string;
      authorId?: number;
      publisherId?: number;
      genresId?: number[];
    },
  ) {
    return this.booksService.update(id, bookUpdate);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book' })
  @ApiOkResponse({ description: 'Book deleted' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}
