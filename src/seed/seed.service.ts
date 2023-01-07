import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRANDS_SEED } from './data/brands.seed';
import { CARS_SEED } from './data/cars.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ) {}
  
  populateDB() {
    this.carsService.fillCarsWithSeedData(CARS_SEED); //inyectamos los seeds en el servicio para que este los llene desde el fill
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED); //inyectamos los seeds en el servicio para que este los llene desde el fill
    return 'SEED executed';
  }

}
