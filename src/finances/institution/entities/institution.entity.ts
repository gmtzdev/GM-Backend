import { Bill } from 'src/finances/bill/entities/bill.entity';
import { Debt } from 'src/finances/debt/entities/debt.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'finance', name: 'institution' })
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  location: string;

  @OneToMany(() => Bill, (bill) => bill.institution)
  bills: Bill[];

  @OneToMany(() => Debt, (debt) => debt.institution)
  debts: Debt[];
}
