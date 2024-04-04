import { Bill } from "src/finances/bill/entities/bill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({ database: 'finance', name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Bill, bill => bill.payment)
    bills: Bill[]
}
