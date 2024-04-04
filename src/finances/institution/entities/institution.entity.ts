import { Bill } from "src/finances/bill/entities/bill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'finance', name: 'institution' })
export class Institution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @OneToMany(() => Bill, bill => bill.institution)
    bills: Bill[]
}
