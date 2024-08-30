
import { CategoryTask } from "src/productivity/category-task/entities/category-task.entity";
import { List } from "src/productivity/list/entities/list.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'productivity', name: 'task' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ default: false })
    ready: boolean;

    @Column({ default: 0 })
    owner: number;
    @Column({ default: 0 })
    assigned: number;

    @Column({ default: null })
    duedate: Date;

    @Column({ default: null })
    note: string;

    @Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
    created_at: Date;
    @Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date;

    @ManyToOne(() => List, list => list.tasks)
    list: List;

    @ManyToMany(() => CategoryTask)
    @JoinTable()
    categories: CategoryTask[];
}
