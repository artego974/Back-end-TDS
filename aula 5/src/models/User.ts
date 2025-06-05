import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";
import { FavoriteDish} from "./FavoriteDish";

@Entity('users')
export class User {

     @PrimaryGeneratedColumn()
     id!: number;

     @Column({ length: 100, nullable: false })
     private _name: string;

     @Column({ unique: true })
     private _email: string;

     @Column({ nullable: false })
     private _password: string;

     @Column({ unique: true, length: 15 })
     private _phone: string;

     @Column({ default: "customer" })
     private _role: string;

     @OneToMany(() => Order, (order) => order.user)
     orders!: Order[];

     @OneToMany(() => FavoriteDish, (favoriteDish) => favoriteDish.user)
     favoriteDish!: FavoriteDish[];     

     /**
      * Getter name
      * @return {string}
      */
     public get name(): string {
          return this._name;
     }

     /**
      * Getter email
      * @return {string}
      */
     public get email(): string {
          return this._email;
     }

     /**
      * Getter password
      * @return {string}
      */
     public get password(): string {
          return this._password;
     }
     /**
      * Getter password
      * @return {string}
      */
     public get phone(): string {
          return this._phone;
     }

     /**
      * Getter role
      * @return {string}
      */
     public get role(): string {
          return this._role;
     }

     /**
      * Setter name
      * @param {string} value
      */
     public set name(value: string) {
          this._name = value;
     }

     /**
      * Setter email
      * @param {string} value
      */
     public set email(value: string) {
          this._email = value;
     }

     /**
      * Setter password
      * @param {string} value
      */
     public set password(value: string) {
          this._password = value;
     }

     /**
      * Setter password
      * @param {string} value
      */
     public set phone(value: string) {
          this._phone = value;
     }

     /**
      * Setter role
      * @param {string} value
      */
     public set role(value: string) {
          this._role = value;
     }


     constructor(name: string, email: string, password: string, phone:string, role: string) {
          this._name = name;
          this._email = email;
          this._password = password;
          this._phone = phone;
          this._role = role;

     }
}