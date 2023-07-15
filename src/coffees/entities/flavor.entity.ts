import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Coffee } from "./coffee.entity";

@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()   // Auto increment primary key
    id: number;

    @Column()
    name: string;

    @ManyToMany(
        type => Coffee, 
        (coffee) => coffee.flavors
    )
    coffees: Coffee[]
}

