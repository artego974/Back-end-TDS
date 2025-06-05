import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Dish } from "./Dish";

@Entity('FavoriteDish')
export class FavoriteDish {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  private _quantity: number;

  @ManyToOne(() => User, (user) => user.favoriteDish)
  user!: User;

  @ManyToOne(() => Dish, (dish) => dish.favoriteByUsers)
  dish!: Dish;


    /**
     * Getter quantity
     * @return {number}
     */
	public get quantity(): number {
		return this._quantity;
	}

    /**
     * Setter quantity
     * @param {number} value
     */
	public set quantity(value: number) {
		this._quantity = value;
	}
  
  constructor(quantity: number){
    this._quantity = quantity;
  }
  
}