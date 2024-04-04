import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({database: 'gmproject', name: 'navitem'})
export class NavItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    icon: string;

    @Column({unique: true})
    route: string;
}
