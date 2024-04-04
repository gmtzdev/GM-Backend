import { Bill } from "src/finances/bill/entities/bill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'finance', name: 'card' })
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    owner: number;

    @Column({ unique: true })
    reference: string;

    @Column()
    type: number;

    @Column()
    sequence: number;

    @OneToMany(() => Bill, bill => bill.card)
    bills: Bill[]
}
