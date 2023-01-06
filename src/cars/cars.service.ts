import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Injectable()
export class CarsService {

    /**
     * Se usuran uuids para generar los ids y mejorar la integridad de datos
     * todas las instalaciones de tipo types se instalan --save-dev
     */

    private cars : Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ]

    public findAll() {
        return this.cars;
    }

    public findOneById(id: string) {
        const car = this.cars.find( car => car.id === id);

        /*
         * NotFoundException es un Exception controlado(revisar docu) con nest que valida si un elemento existe o no(error 404)
         */
        if(!car) throw new NotFoundException(`Car with id '${id}' not found`);

        return car;
    }

    create(createCarDto: CreateCarDto) {

        const car: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(car);

        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {

        let carFind = this.findOneById(id);

        if(updateCarDto.id && updateCarDto.id != id) throw new BadRequestException('Car id is not valid inside body');

        this.cars = this.cars.map(car => {
            if(car.id === id) {
                carFind = { ...carFind, ...updateCarDto, id}
                return carFind;
            }
            return car;
        });

        return carFind;
    }

    delete(id: string) {
        /*
        Mi metodo
        let index = 0;

        for(let i = 0; i < this.cars.length; i++) {
            if(this.cars[i].id === id) index = i
        }

        if(index == 0) {
            throw new BadRequestException(`Car with id ${id} doesn't exists`);
        } else {
            this.cars.splice(index,1);
            return `Car with ${id} was deleted`;
        }
        */
       const car = this.findOneById(id);
       this.cars = this.cars.filter(car => car.id !== id);
       return `The car with id ${id} was deleted`;
    }
}
