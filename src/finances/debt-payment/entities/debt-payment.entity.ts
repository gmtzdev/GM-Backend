import { Debt } from 'src/finances/debt/entities/debt.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'finance', name: 'debtpayment' })
export class DebtPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  message: string;

  @Column({
    type: 'timestamp',
    default: () => {
      return 'CURRENT_TIMESTAMP';
    },
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Debt, (debt) => debt.debtPayments)
  debt: Debt;
}
