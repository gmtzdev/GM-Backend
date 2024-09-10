import { DebtPayment } from 'src/finances/debt-payment/entities/debt-payment.entity';
import { Institution } from 'src/finances/institution/entities/institution.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'debt', database: 'finance' })
export class Debt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  debt: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'double' })
  paid: number;

  @Column({ type: 'double', default: 0 })
  percentage: number;

  @Column({ default: false })
  complete: boolean;

  @Column({
    type: 'timestamp',
    default: () => {
      return 'CURRENT_TIMESTAMP';
    },
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @OneToMany(() => DebtPayment, (debtPayment) => debtPayment.debt)
  debtPayments: DebtPayment[];

  @ManyToOne(() => Institution, (institution) => institution.debts)
  institution: Institution;
}
