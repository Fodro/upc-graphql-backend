
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Bouquet {
    __typename?: 'Bouquet';
    id: string;
    title: string;
    price: number;
    photo: string;
    seller: Seller;
}

export class Seller {
    __typename?: 'Seller';
    id: string;
    title: string;
    photo: string;
    creationDate: string;
    bouquets?: Nullable<Nullable<Bouquet>[]>;
    bouquetsSold: number;
}

export class Customer {
    __typename?: 'Customer';
    id: string;
    name: string;
    email: string;
    purchases?: Nullable<Nullable<Purchase>[]>;
}

export class Purchase {
    __typename?: 'Purchase';
    id: string;
    bouquet: Bouquet;
    customer: Customer;
    price: number;
    income: number;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract customer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;

    abstract allCustomers(): Nullable<Customer>[] | Promise<Nullable<Customer>[]>;

    abstract bouquet(id: string): Nullable<Bouquet> | Promise<Nullable<Bouquet>>;

    abstract allBouquets(): Nullable<Bouquet>[] | Promise<Nullable<Bouquet>[]>;

    abstract bouquetsBySeller(sellerId: string): Nullable<Nullable<Bouquet>[]> | Promise<Nullable<Nullable<Bouquet>[]>>;

    abstract purchase(id: string): Nullable<Purchase> | Promise<Nullable<Purchase>>;

    abstract purchases(customerId: number): Nullable<Purchase>[] | Promise<Nullable<Purchase>[]>;

    abstract allPurchases(): Nullable<Purchase>[] | Promise<Nullable<Purchase>[]>;

    abstract seller(id: number): Nullable<Seller> | Promise<Nullable<Seller>>;

    abstract allSellers(): Nullable<Seller>[] | Promise<Nullable<Seller>[]>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createCustomer(name: string, email: string): Customer | Promise<Customer>;

    abstract deleteCustomer(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract updateCustomer(id: string, name?: Nullable<string>, email?: Nullable<string>): Customer | Promise<Customer>;

    abstract createBouquet(title: string, price: number, photo: string, sellerId: number): Bouquet | Promise<Bouquet>;

    abstract deleteBouquet(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract updateBouquet(id: string, title?: Nullable<string>, price?: Nullable<number>, photo?: Nullable<string>): Bouquet | Promise<Bouquet>;

    abstract createSeller(title: string, photo: string): Seller | Promise<Seller>;

    abstract deleteSeller(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract updateSeller(id: string, title?: Nullable<string>, photo?: Nullable<string>): Seller | Promise<Seller>;

    abstract purchaseBouquet(id: string, customerId: number): Purchase | Promise<Purchase>;
}

type Nullable<T> = T | null;
