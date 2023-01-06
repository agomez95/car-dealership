import { IsString } from "class-validator";

export class CreateCarDto {

    @IsString()
    readonly brand: string;

    @IsString()
    readonly model: string;
}
/**
 * class-validator: El uso del class-validator se ve reflejado con los @
 */ 