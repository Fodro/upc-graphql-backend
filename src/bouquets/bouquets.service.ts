import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bouquet } from './bouquets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BouquetService {
	constructor(
		@InjectRepository(Bouquet)
		private bouquetRepository: Repository<Bouquet>,
	) { }
	async findById(id: number): Promise<Bouquet> {
		return await this.bouquetRepository.findOne(id);
	}
	async findAll(): Promise<Bouquet[]> {
		return await this.bouquetRepository.find();
	}
	async findBySellerId(sellerId: number): Promise<Bouquet[]>{
		return await this.bouquetRepository.find({
			where: { sellerId: sellerId },
		});
	}
	async createBouquet(
		title: string,
		price: number,
		photo: string,
		sellerId: number,
	): Promise<Bouquet>{
		const newBouquet = new Bouquet();
		newBouquet.title = title;
		newBouquet.price = price;
		newBouquet.photo = photo;
		newBouquet.sellerId = sellerId;
		await this.bouquetRepository.save(newBouquet);
		return newBouquet;
	}
	async deleteBouquet(id: number): Promise<boolean>{
		const bouquet: Bouquet | undefined = await this.bouquetRepository.findOne(id);
		if (!bouquet)
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		await this.bouquetRepository.delete(bouquet);
		return true;
	}
	async updateBouquet(
		id: number,
		title: string | undefined,
		price: number | undefined,
		photo: string | undefined,
	): Promise<Bouquet> {
		const bouquet: Bouquet | undefined = await this.bouquetRepository.findOne(id);

		if(!bouquet)
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

		if (title)
			bouquet.title = title;
		if (photo)
			bouquet.photo = photo;
		if (price)
			bouquet.price = price;
		await this.bouquetRepository.save(bouquet);
		return bouquet;
	}
}
