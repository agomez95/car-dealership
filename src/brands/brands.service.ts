import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {v4 as uuid} from 'uuid'
import { Brand } from './entities/brand.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime()
    }
  ]

  create(createBrandDto: CreateBrandDto) {

    const {name} = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);

    if(!brand) throw new NotFoundException(`Brand with id '${id}' not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandFind = this.findOne(id);

    this.brands = this.brands.map(brand => {
      if(brand.id === id) {
        brandFind.updatedAt = new Date().getTime()
        brandFind = {...brandFind, ...updateBrandDto, id}
        return brandFind;
      }
      return brand;
    });

    return brandFind;
  }

  remove(id: string) {
    this.brands = this.brands.filter(brand => brand.id !== id);
    return `The car with id ${id} was deleted`;
  }
}
