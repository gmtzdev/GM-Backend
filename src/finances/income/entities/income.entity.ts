import { Origin } from "src/finances/origin/entities/origin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ database: 'finance', name: 'income' })
export class Income {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    concept: string;

    @Column({ type: 'double' })
    amount: number;

    @Column({ default: true })
    visible: boolean;

    @Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
    updated_at: Date;

    @ManyToOne(() => Origin, origin => origin.incomes)
    origin: Origin;
}
