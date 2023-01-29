import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Coffee 1',
            brand: 'Trung Nguyen',
            flavors: ['chocolate', 'vanilla']
        },
        {
            id: 2,
            name: 'Coffee 2',
            brand: 'Thai Nguyen',
            flavors: ['chocolate', 'vanilla']
        }
    ];

    findAll(){
        return this.coffees
    }

    findOne(id: number){       
        const coffee = this.coffees.find(item => item.id === +id);
        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found!`)
        }
        return coffee
    }

    create(createCoffeeDto: any){
        this.coffees.push(createCoffeeDto)
    }

    update(id: number, updateCoffeeDto: any){
        const existingCoffee = this.findOne(id)
        if(existingCoffee){
            const foundIndex = this.coffees.findIndex(x => x.id === +id);
            return this.coffees[foundIndex] = updateCoffeeDto            
        }
    }

    delete(id: number){
        const coffeeIndex = this.coffees.findIndex(coffee => coffee.id === +id)
        if(coffeeIndex >= 0){
           this.coffees = this.coffees.filter(obj => obj.id !== +id);
           return this.coffees
        }
    }
}

