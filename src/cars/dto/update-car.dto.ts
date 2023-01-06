import { IsString, IsOptional } from "class-validator";

export class UpdateCarDto {

    @IsString()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    readonly model?: string;
}
/**
 * class-validator: El uso del class-validator se ve reflejado con los @
 */ 