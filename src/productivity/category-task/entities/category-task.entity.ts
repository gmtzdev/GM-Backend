import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'productivity', name: 'categorytask' })
export class CategoryTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ default: 'ghost' })
    icon: string;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date;

    @Column({ default: 0 })
    count: number;
}
