import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('coffees') // sql table = 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn()   // Auto increment primary key
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', {nullable: true})   // accept null value
    flavors: string[];

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    date_created: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    date_updated: Date;
}