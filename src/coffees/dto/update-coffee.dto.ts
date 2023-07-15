// PartialType: su dung de gan validate rule UpdateCoffeeDto giong voi CreateCoffeeDto
// Nếu không sử dụng PartialType thì phải viết class UpdateCoffeeDto như phần comment bên dưới

import { PartialType } from '@nestjs/mapped-types'
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

// export class UpdateCoffeeDto {
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
// }
