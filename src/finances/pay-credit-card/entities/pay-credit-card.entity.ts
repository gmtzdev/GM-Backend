import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'paycreditcard', database: 'finance' })
export class PayCreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  cutOffDate: Date;

  @Column({ type: 'timestamp' })
  payDate: Date;

  @Column({ type: 'boolean', default: false })
  pay: boolean;

  @CreateDateColumn()
  created_at: Date;
}
