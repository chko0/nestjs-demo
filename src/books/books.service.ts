import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      authorId: 4,
      publisherId: 1,
    },
    {
      id: 2,
      title: 'A Tale of Two Cities',
      authorId: 2,
      publisherId: 2,
    },
    {
      id: 3,
      title: 'Adventures of Huckleberry Finn',
      authorId: 3,
      publisherId: 3,
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      authorId: 1,
      publisherId: 4,
    },
  ];

  constructor(private readonly authorsService: AuthorsService) {}

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  create(book: { title: string; authorId: number; publisherId: number }) {
    const newBook = {
      id: this.books[this.books.length - 1].id + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(
    id: number,
    book: { title?: string; authorId?: number; publisherId?: number },
  ) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...book,
    };
    return this.books[bookIndex];
  }

  delete(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
    return bookIndex;
  }
}
