import { Query, Resolver, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer } from './customers.entity';
import { PurchaseService } from 'src/purchases/purchases.service';
import { Purchase } from 'src/purchases/purchases.entity';

@Resolver('Customer')
export class CustomersResolver {
	constructor(
		private customerService: CustomersService,
		private purchaseService: PurchaseService
	) {}

	@Query('customer')
	async getClientByID(@Args('id') id: number): Promise<Customer> {
		return await this.customerService.findById(id);
	}

	@Query('allCustomers')
	async getAllClients(): Promise<Customer[]> {
		return await this.customerService.findAll();
	}

	@Mutation('createCustomer')
	async createCustomer(@Args('name') name: string, @Args('email') email: string): Promise<Customer> {
		return await this.customerService.createCustomer(name, email);
	}

	@Mutation('deleteCustomer')
	async deleteCustomer(@Args('id') id: number): Promise<boolean> {
		return await this.customerService.deleteCustomer(id);
	}

	@Mutation('updateCustomer')
	async updateCustomer(
		@Args('id') id: number,
		@Args('name') name: string | undefined,
		@Args('email') email: string | undefined
	): Promise<Customer>{ 
		return await this.customerService.updateCustomer(id, name, email);
	}

	@ResolveField()
	async purchases(@Parent() customer: Customer): Promise<Purchase[]> {
		const { id } = customer;
		return await this.purchaseService.findByCustomerId(id);
	}
}
