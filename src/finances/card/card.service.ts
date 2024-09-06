import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card, 'finance')
    private cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const newCard = this.cardRepository.create(createCardDto);
    const card = await this.cardRepository.save(newCard);
    if (!(card instanceof Card)) {
      throw new HttpException('Card not created', HttpStatus.BAD_REQUEST);
    }
    return new HttpResponse(true, 'Card created successfully', card);
  }

  async findAll() {
    const cards = await this.cardRepository.find({
      order: { sequence: 'ASC' },
    });
    return new HttpResponse(true, 'Cards were found!!', cards);
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    console.log(updateCardDto);
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
