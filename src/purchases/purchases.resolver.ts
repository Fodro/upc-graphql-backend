import { Query, Resolver, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { Purchase } from './purchases.entity';
import { PurchaseService } from './purchases.service';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/customers.entity';
import { BouquetService } from 'src/bouquets/bouquets.service';
import { Bouquet } from 'src/bouquets/bouquets.entity';

@Resolver('Purchase')
export class PurchaseResolver {
	constructor(
		private purchaseService: PurchaseService,
		private customersService: CustomersService,
		private bouquetService: BouquetService
	){}
	
	@Query('purchase')
	async getPurchase(@Args('id') id: number): Promise<Purchase> {
		return await this.purchaseService.findById(id);
	}

	@Query('purchases')
	async getPurchasesByCustomer(@Args('customerId') customerId: number): Promise<Purchase[]> {
		return await this.purchaseService.findByCustomerId(customerId);
	}

	@Query('allPurchases')
	async getAllPurchases(): Promise<Purchase[]> {
		return await this.purchaseService.findAll();
	}

	@Mutation('purchaseBouquet')
	async purchaseBouquet(@Args('id') id: number, @Args('customerId') customerId: number): Promise<Purchase> {
		return await this.purchaseService.makePurchase(id, customerId);
	}

	@ResolveField('customer')
	async customer(@Parent() purchase: Purchase): Promise<Customer> {
		const { customerId } = purchase;
		return await this.customersService.findById(customerId);
	}

	@ResolveField('bouquet')
	async bouquet(@Parent() purchase: Purchase): Promise<Bouquet> {
		const { bouquetId } = purchase;
		return this.bouquetService.findById(bouquetId);
	}
}
