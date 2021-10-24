import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './sellers.entity';

@Injectable()
export class SellersService {
	constructor(
		@InjectRepository(Seller)
		private sellerRepository: Repository<Seller>
	){}

	async findById(id: number): Promise<Seller> {
		return await this.sellerRepository.findOne(id);
	}
	async findAll(): Promise<Seller[]> {
		return await this.sellerRepository.find();
	}
	async createSeller(title: string, photo: string): Promise<Seller> {
		const newSeller = new Seller();
		newSeller.title = title;
		newSeller.photo = photo;
		newSeller.creationDate = Date.now().toLocaleString();
		newSeller.bouquetsSold = 0;
		await this.sellerRepository.save(newSeller);
		return newSeller;
	}
	async deleteSeller(id: number): Promise<boolean> {
		const seller: Seller | undefined = await this.sellerRepository.findOne(id);
		if (seller){
			await this.sellerRepository.remove(seller);
			return true;
		}
		else 
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
	}
	async updateSeller(
		id: number,
		title: string | undefined,
		photo: string | undefined
	): Promise<Seller> {
		const seller: Seller | undefined = await this.sellerRepository.findOne(id);

		if (!seller)
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

		if(title)
			seller.title = title;
		if(photo)
			seller.photo = photo;
		
		this.sellerRepository.save(seller);
		return seller;
	}
	async purchaseBouquet(id: number): Promise<void>{
		const seller: Seller = await this.sellerRepository.findOne(id);
		seller.bouquetsSold += 1;
		await this.sellerRepository.save(seller);
	}
}
