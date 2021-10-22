import { forwardRef, Module } from '@nestjs/common';
import { SellersResolver } from './sellers.resolver';
import { SellersService } from './sellers.service';
import { BouquetModule } from 'src/bouquets/bouquets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './sellers.entity';

@Module({
	imports: [
		forwardRef(() => BouquetModule),
		TypeOrmModule.forFeature([Seller]),
	],
	providers: [SellersService, SellersResolver],
	exports: [SellersService],
}) export class SellersModule { }
