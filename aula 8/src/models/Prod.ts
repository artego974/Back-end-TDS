import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert,BeforeUpdate, AfterLoad } from 'typeorm';

@Entity('prods')
export class Prod {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ unique: true, nullable:false })
    preco: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    qtnd: number;


    constructor(name: string, preco: number, qtnd: number) {
        this.name = name;
        this.preco = preco;
        this.qtnd = qtnd;
    }

}