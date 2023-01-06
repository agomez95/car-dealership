import { Controller, Get, Param, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Patch, Post, UsePipes } from '@nestjs/common/decorators';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor (private readonly carsService: CarsService) {}

    @Get()
    getallCars() {
        return this.carsService.findAll();
    }

    /**
     * @param id string
     * @returns object car
     */
    @Get(':id') 
    //getCarById(@Param('id', ParseIntPipe) id) { //con este Pipe hara que el parametro numerico que ingrese siempre sea un numero
    getCarById(@Param('id', ParseUUIDPipe ) id: string) {
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id') id, 
        @Body() updateCarDto: UpdateCarDto
    ) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe ) id: string) {
        return this.carsService.delete(id);
    }
}
