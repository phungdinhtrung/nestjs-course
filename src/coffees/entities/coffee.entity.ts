import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinTable, ManyToMany, Index } from "typeorm";
import { Flavor } from "./flavor.entity";

@Index(['name', 'brand'])
@Entity() // sql table = 'coffee' | 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn()   // Auto increment primary key
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(
        type => Flavor, 
        (flavor) => flavor.coffees,
        {
            cascade: true,  // 👈 or optionally just insert ['insert'] or update ['update']
        }
    )
    flavors: Flavor[];

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    date_created: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    date_updated: Date;

    @DeleteDateColumn()
    date_deleted: Date;
}