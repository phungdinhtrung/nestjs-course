import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';


@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,

        // Bảng quan hệ n - n với bảng Coffee
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,

        // Datasource for transactions
        private readonly dataSource: DataSource,
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
        }

        return coffee
    }

    async create(createCoffeeDto: CreateCoffeeDto){
        const flavors = await Promise.all(  // Kết quả return: [ Flavor { id: 2, name: 'flavors 2' }, Flavor { name: 'flavors 4' } ], nếu flavor đã tồn tại trả về id, name; nếu chưa thì trả về name;
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        )

        const coffee = await this.coffeeRepository.create(
            {
                ...createCoffeeDto,
                flavors
            }
        );
        // Create without transactions
        // return this.coffeeRepository.save(coffee);    
        
        // Create with transactions
        return await this.createCoffeeWithTransaction(coffee);
    }

    async createCoffeeWithTransaction(coffee: Coffee) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {    
            // Save coffee
            const coffee_save = await queryRunner.manager.save(coffee);

            // Save event
            const recommendEvent    =  new Event();
            recommendEvent.name     = 'create_coffee';
            recommendEvent.type     = 'coffee';
            recommendEvent.payload  = { coffeeId : coffee_save.id };

            await queryRunner.manager.save(recommendEvent);

            // commit transaction now
            await queryRunner.commitTransaction();
           
            // return coffee_save

        } catch (error) { // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();

        } finally { // release query runner commit which is manually created
            await queryRunner.release();
        }
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

        if (existingFlavor) {
          return existingFlavor;
        }

        return this.flavorRepository.create({ name });
    }
}

