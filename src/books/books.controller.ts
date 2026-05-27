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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll(@Query('includeAuthor') includeAuthor: string) {
    return { books: this.booksService.findAll(includeAuthor === 'true') };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create book' })
  @ApiResponse({ status: 201, description: 'Book created' })
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
  @ApiResponse({ status: 200, description: 'Book updated' })
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
  @ApiResponse({ status: 200, description: 'Book deleted' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}
