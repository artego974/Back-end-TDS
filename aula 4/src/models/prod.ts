import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('prod') // nome da tabela
export class Prod {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type:"numeric", nullable:false })
    price: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    description: string;

    constructor(name: string, price: number, description: string) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}