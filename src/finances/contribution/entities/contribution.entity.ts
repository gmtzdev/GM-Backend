import { Objective } from "src/finances/objective/entities/objective.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'finance', name: 'contribution' })
export class Contribution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    message: string;

    @Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
    created_at: Date;

    @Column({ default: false })
    removed: boolean;

    @ManyToOne(() => Objective, objective => objective.contributions)
    objective: Objective;
}
