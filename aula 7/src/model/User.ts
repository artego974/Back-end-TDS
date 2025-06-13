import { Entity,PrimaryGeneratedColumn,Column,AfterLoad,BeforeInsert,BeforeUpdate } from "typeorm";
import bcryptjs from "bcryptjs"

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: "varchar", length:100, nullable: false, unique:false})
    name: string;
    @Column({type: "varchar", length:100, nullable: false, unique:true})
    email: string;
    @Column({type: "varchar", length:255, nullable: false})
    password: string;

    private ogirinalPassword:string 

    constructor(email:string, password: string, name:string){
        this.email = email;
        this.password = password;
        this.name = name;
        this.ogirinalPassword = password;
    }

    @AfterLoad()
    setOriginal(){
        this.ogirinalPassword = this.password
    }
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password !== this.ogirinalPassword){
            this.password = await bcryptjs.hash(this.password, 10)
        }
    }
}