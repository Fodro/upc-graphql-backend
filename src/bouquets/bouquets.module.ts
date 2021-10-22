import { forwardRef, Module } from '@nestjs/common';
import { BouquetResolver } from './bouquets.resolver';
import { BouquetService } from './bouquets.service';
import { SellersModule } from 'src/sellers/sellers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bouquet } from './bouquets.entity';

@Module({
	imports: [
		forwardRef(() => SellersModule),
		TypeOrmModule.forFeature([Bouquet]),
	],
	providers: [BouquetService, BouquetResolver],
	exports: [BouquetService],
}) export class BouquetModule {}
