import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bouquet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;
	
	@Column()
	photo: string;

	@Column()
	price: number;

	@Column()
	sellerId: number;
}
