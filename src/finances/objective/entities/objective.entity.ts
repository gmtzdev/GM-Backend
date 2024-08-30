import { Contribution } from "src/finances/contribution/entities/contribution.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'finance', name: 'objective' })
export class Objective {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    objective: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'double' })
    amount: number;

    @Column({ type: 'double', default: 0 })
    percentage: number;

    @Column({ default: false })
    complete: boolean;

    @Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
    created_at: Date;

    @OneToMany(() => Contribution, contribution => contribution.objective)
    contributions: Contribution[]
}
