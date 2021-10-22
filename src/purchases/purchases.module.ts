import { forwardRef, Module } from '@nestjs/common';
import { PurchaseResolver } from './purchases.resolver';
import { PurchaseService } from './purchases.service';
import { CustomersModule } from 'src/customers/customers.module';
import { BouquetModule } from 'src/bouquets/bouquets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchases.entity';

@Module({
	imports: [
		forwardRef(() => CustomersModule),
		forwardRef(() => BouquetModule),
		TypeOrmModule.forFeature([Purchase]),
	],
	providers: [PurchaseResolver, PurchaseService],
	exports: [PurchaseService],
}) export class PurchaseModule {}
