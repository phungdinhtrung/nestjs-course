import { Controller, Get, Res, Param, Post, Patch, Delete, Body, HttpStatus } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService){}

  // /coffees
  @Get()
  findAll(@Res() res) {
    res.status(HttpStatus.OK).json(this.coffeesService.findAll());
  }

  // /coffees/:id
  @Get(':id')
  findOne(@Param('id') id: number, @Res() res) {   
    res.status(HttpStatus.OK).json(this.coffeesService.findOne(+id));
  }

  // coffees
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto, @Res() res){
    res.status(HttpStatus.OK).json(this.coffeesService.create(createCoffeeDto));
  }


  // coffees/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto, @Res() res) {
    res.status(HttpStatus.OK).json(this.coffeesService.update(+id, updateCoffeeDto));
  }

  // coffees/:id
  @Delete(':id')
  delete(@Param('id') id: string, @Res() res) {
    res.status(HttpStatus.OK).json(this.coffeesService.delete(+id));
  }
}

