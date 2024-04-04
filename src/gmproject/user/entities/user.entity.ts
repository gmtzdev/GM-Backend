import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({database: 'gmproject', name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => {return 'CURRENT_TIMESTAMP'}})
    createAt: Date;

    @Column({ nullable: true})
    authStrategy: string;
}
