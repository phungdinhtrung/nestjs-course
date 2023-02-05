import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';


@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ) {}

    async findAll(){              
        return await this.coffeeRepository.find({
            relations: {
                flavors: true
            }
        })
    }

    async findOne(id: number){       
        const coffee = await this.coffeeRepository.findOne({ 
            where: { id: +id },
            relations: {
                flavors: true
            }
        });
       
        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found!`)
        }else{
            console.log('coffee found', coffee);
            
        }
        return coffee
    }

    async create(createCoffeeDto: CreateCoffeeDto){
        const flavors = await Promise.all(  // [ Flavor { id: 2, name: 'flavors 2' }, Flavor { name: 'flavors 4' } ], nếu flavor đã tồn tại trả về id, name; nếu chưa thì trả về name;
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        )

        const coffee = await this.coffeeRepository.create(
            {
                ...createCoffeeDto,
                flavors
            }
        );
        return this.coffeeRepository.save(coffee);        
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto){
        const flavors = await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        )       

        const coffee = await this.coffeeRepository.preload({
            id: id,
            ...updateCoffeeDto,
            flavors
        })

        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found!`)    
        }
        return this.coffeeRepository.save(coffee)
    }

    async delete(id: number){
        const coffee = await this.findOne(id)
        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found!`)    
        }
        return this.coffeeRepository.remove(coffee)
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } }); // 👈 notice the "where"
        console.log('existingFlavor', existingFlavor);
        if (existingFlavor) {
          return existingFlavor;
        }

        return this.flavorRepository.create({ name });
    }
}

