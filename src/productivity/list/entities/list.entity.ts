import { Task } from "src/productivity/task/entities/task.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'productivity', name: 'list' })
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ default: 'ghost' })
    icon: string;

    @Column({ default: 0 })
    counter: number;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date;

    @OneToMany(() => Task, task => task.list)
    tasks: Task[]
}
