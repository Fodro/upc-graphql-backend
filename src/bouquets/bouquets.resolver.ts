import { Query, Resolver, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { Bouquet } from './bouquets.entity';
import { BouquetService } from './bouquets.service';
import { Seller } from 'src/sellers/sellers.entity';
import { SellersService } from 'src/sellers/sellers.service';

@Resolver('Bouquet')
export class BouquetResolver {
	constructor(
		private bouquetsService: BouquetService,
		private sellersService: SellersService,
	) {}

	@Query('bouquet')
	async getBouquets(@Args('id') id: number): Promise<Bouquet> {
		return await this.bouquetsService.findById(id);
	}

	@Query('allBouquets')
	async getAllBouquets(): Promise<Bouquet[]> {
		return await this.bouquetsService.findAll();
	}

	@Query('bouquetsBySeller')
	async getBouquetsBySeller(@Args('sellerId') sellerId: number): Promise<Bouquet[]> {
		return await this.bouquetsService.findBySellerId(sellerId);
	}

	@Mutation('createBouquet')
	async createBouquet(
		@Args('title') title: string,
		@Args('price') price: number,
		@Args('photo') photo: string,
		@Args('sellerId') sellerId: number,
	): Promise<Bouquet> {
		return await this.bouquetsService.createBouquet(title, price, photo, sellerId);
	}

	@Mutation('deleteBouquet')
	async deleteBouquet(@Args('id') id: number): Promise<boolean> {
		return await this.bouquetsService.deleteBouquet(id);
	}

	@Mutation('updateBouquet')
	async updateBouquet(
		@Args('id') id: number,
		@Args('title') title: string | undefined,
		@Args('price') price: number | undefined,
		@Args('photo') photo: string | undefined,
	): Promise<Bouquet> {
		return await this.bouquetsService.updateBouquet(id, title, price, photo);
	}

	@ResolveField('seller')
	async seller(@Parent() bouquet: Bouquet): Promise<Seller> {
		return this.sellersService.findById(bouquet.sellerId);
	}
}
