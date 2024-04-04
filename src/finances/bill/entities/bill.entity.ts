import { Card } from "src/finances/card/entities/card.entity";
import { Category } from "src/finances/category/entities/category.entity";
import { Institution } from "src/finances/institution/entities/institution.entity";
import { Payment } from "src/finances/payment/entities/payment.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'finance', name: 'bill' })
export class Bill {
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

    @ManyToOne(() => Category, category => category.bills)
    category: Category

    @ManyToOne(() => Payment, payment => payment.bills)
    payment: Payment

    @ManyToOne(() => Card, card => card.bills)
    card: Card

    @ManyToOne(() => Institution, institution => institution.bills)
    institution: Institution
}
