import { Income } from "src/finances/income/entities/income.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'finance', name: 'origin' })
export class Origin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Income, income => income.origin)
    incomes: Income[]
}
