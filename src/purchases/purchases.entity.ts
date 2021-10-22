import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	price: number;

	@Column()
	income: number;

	@Column()
	customerId: number;

	@Column()
	bouquetId: number;
}
