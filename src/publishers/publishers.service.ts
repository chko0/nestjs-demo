import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PublishersService {
  private publishers = [
    { id: 1, name: 'Scribner' },
    { id: 2, name: 'Penguin Classics' },
    { id: 3, name: 'Harper & Brothers' },
    { id: 4, name: 'T. Egerton' },
  ];

  findAll() {
    return this.publishers;
  }

  findOne(id: number) {
    const publisher = this.publishers.find((p) => p.id === id);
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  create(publisher: { name: string }) {
    const newPublisher = {
      id: this.publishers[this.publishers.length - 1].id + 1,
      ...publisher,
    };
    this.publishers.push(newPublisher);
    return newPublisher;
  }

  update(id: number, publisher: { name?: string }) {
    const publisherIndex = this.publishers.findIndex((p) => p.id === id);
    if (publisherIndex === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    this.publishers[publisherIndex] = {
      ...this.publishers[publisherIndex],
      ...publisher,
    };
    return this.publishers[publisherIndex];
  }

  delete(id: number) {
    const publisherIndex = this.publishers.findIndex((p) => p.id === id);
    if (publisherIndex === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    this.publishers.splice(publisherIndex, 1);
    return publisherIndex;
  }
}
