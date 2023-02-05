import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column('json')
    payload:  Record<string, any>;

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    date_created: Date;
}
