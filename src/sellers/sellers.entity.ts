import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seller {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	photo: string;

	@Column()
	creationDate: string;

	@Column()
	bouquetsSold: number;
}
