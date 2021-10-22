import { Query, Resolver, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { Seller } from './sellers.entity';
import { SellersService } from './sellers.service';
import { Bouquet } from 'src/bouquets/bouquets.entity';
import { BouquetService } from 'src/bouquets/bouquets.service';

@Resolver('Seller')
export class SellersResolver {
	constructor(
		private sellersService: SellersService,
		private bouquetsService: BouquetService
	) {}

	@Query('seller')
	async getSeller(@Args('id') id: number): Promise<Seller> {
		return await this.sellersService.findById(id);
	}

	@Query('allSellers')
	async getAllSellers(): Promise<Seller[]> {
		return await this.sellersService.findAll();
	}

	@Mutation('createSeller')
	async createSeller(@Args('title') title: string, @Args('photo') photo: string): Promise<Seller> {
		return await this.sellersService.createSeller(title, photo);
	}

	@Mutation('deleteSeller')
	async deleteSeller(@Args('id') id: number): Promise<boolean> {
		return await this.sellersService.deleteSeller(id);
	}

	@Mutation('updateSeller')
	async updateSeller(
		@Args('id') id: number,
		@Args('title') title: string | undefined,
		@Args('photo') photo: string | undefined
	): Promise<Seller> {
		return await this.sellersService.updateSeller(id, title, photo);
	}

	@ResolveField('bouquets')
	async bouquets(@Parent() seller: Seller): Promise<Bouquet[]> {
		return await this.bouquetsService.findBySellerId(seller.id);
	}
}
