import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from '@nestjs/common';
import { Purchase } from './purchases.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BouquetService } from 'src/bouquets/bouquets.service';
import { CustomersService } from 'src/customers/customers.service';
import { SellersService } from 'src/sellers/sellers.service';

@Injectable()
export class PurchaseService {
	constructor(
		@InjectRepository(Purchase)
		private purchaseRepository: Repository<Purchase>,

		@Inject(forwardRef(() => BouquetService))
		private bouquetsService: BouquetService,
		
		@Inject(forwardRef(() => CustomersService))
		private customersService: CustomersService,

		@Inject(forwardRef(() => SellersService))
		private sellersService: SellersService,
	){}
	async makePurchase(bouquetId: number, userId: number): Promise<Purchase>{
		const bouquet = await this.bouquetsService.findById(bouquetId);
		if (!bouquet)
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		
		const customer = await this.customersService.findById(userId);
		if (!customer)
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

		await this.sellersService.purchaseBouquet(userId);

		const newPurchase = new Purchase();
		newPurchase.bouquetId = bouquetId;
		newPurchase.customerId = userId;
		newPurchase.price = bouquet.price;
		newPurchase.income = bouquet.price * 0.3;
		await this.purchaseRepository.save(newPurchase);
		return newPurchase;
	}
	async findById(id: number): Promise<Purchase>{
		return await this.purchaseRepository.findOne(id);
	}
	async findByCustomerId(customerId: number): Promise<Purchase[]>{
		return await this.purchaseRepository.find({
			where: {
				customerId: customerId, 
			},
		});
	}
	async findAll(): Promise<Purchase[]> {
		return await this.purchaseRepository.find();
	}
	async deleteByCustomerId(customerId: number): Promise<void>{
		const purchases = await this.findByCustomerId(customerId);
		purchases.forEach(async (purchase) => {
			await this.purchaseRepository.delete(purchase);
		});
	}
}
