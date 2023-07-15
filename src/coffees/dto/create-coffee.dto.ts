import { Expose, Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator'
import { BaseDto } from '../dto/base.dto';

export class CreateCoffeeDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly name: string;

    @IsString()                         // IsString decorator is used to validate the property
    @IsNotEmpty()                       // IsNotEmpty decorator is used to validate the property
    @Expose()                           // Expose decorator is used to expose the property in the response
    readonly brand: string;

    @Transform(({obj}) => obj.name + ' ' + obj.brand) // Transform decorator is used to transform the property
    readonly brandName: string;

    @IsString({each: true})
    readonly flavors: string[];
}

