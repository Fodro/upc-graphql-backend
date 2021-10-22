import { forwardRef, Module } from '@nestjs/common';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';
import { PurchaseModule } from 'src/purchases/purchases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers.entity';

@Module({
	imports: [
		forwardRef(() => PurchaseModule),
		TypeOrmModule.forFeature([Customer]),
	],
	providers: [CustomersService, CustomersResolver],
	exports: [CustomersService],
})
export class CustomersModule {}
