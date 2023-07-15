import { Controller, Get, Res, Param, Post, Patch, Delete, Body, HttpStatus,
    ParseIntPipe, ValidationPipe, UsePipes
} from '@nestjs/common';
import { CoffeesService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService){}

  // coffee
  @Get()
  async findAll(@Res() res) {
    const coffee = await this.coffeesService.findAll()   
    res.status(HttpStatus.OK).json(coffee);
  }

  // coffee/:id
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res) { 
    const coffee = await this.coffeesService.findOne(id)
    res.status(HttpStatus.OK).json(coffee);
  }

  // coffee
  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto, @Res() res){
    const coffee = await this.coffeesService.create(createCoffeeDto)
    res.status(HttpStatus.CREATED).json(coffee);
  }

  // coffee/:id
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto, @Res() res) {
    const coffee = await this.coffeesService.update(id, updateCoffeeDto)
    res.status(HttpStatus.OK).json(coffee);
  }

  // coffee/:id
  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res) {
    const coffee = await this.coffeesService.delete(id)
    res.status(HttpStatus.OK).json(coffee);
  }
}

