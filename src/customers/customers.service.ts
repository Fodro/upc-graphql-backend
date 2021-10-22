import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from '@nestjs/common';
import { Customer } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseService } from 'src/purchases/purchases.service';

@Injectable()
export class CustomersService {
	constructor(
		@InjectRepository(Customer)
		private customerRepository: Repository<Customer>,

		@Inject(forwardRef(() => PurchaseService))
		private purchaseService: PurchaseService,
	){}
	async findById(id: number): Promise<Customer> {
		return await this.customerRepository.findOne(id);
	}
	async findAll(): Promise<Customer[]> {
		return await this.customerRepository.find();
	}
	async createCustomer(name: string, email: string): Promise<Customer> {
		const newCustomer = new Customer();
		newCustomer.name = name;
		newCustomer.email = email;
		await this.customerRepository.save(newCustomer);
		return newCustomer;
	}
	async deleteCustomer(id: number): Promise<boolean> {
		const customer = await this.customerRepository.findOne(id);
		if (!customer) 
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		await this.customerRepository.delete(customer);
		await this.purchaseService.deleteByCustomerId(id);
		return true;
	}
	async updateCustomer(id: number, name: string | undefined, email: string | undefined): Promise<Customer>{
		const customer = await this.customerRepository.findOne(id);
		if (!customer)
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		if (name)
			customer.name = name;
		if (email)
			customer.email = email;
		return customer;
	}
}
