export interface productModel {
    id: string;
    productName: string;
    productCost: string;
    productPrice: string;
    description: string;
    stock: any;
    stockAvailability: number;
    photo: Array<{}>;
    category: string;
    brand: string;
    status: boolean;
    version: number;
}

export interface PhotosProduct {
    id: string;
    photoName: string;
    status: boolean;
    version: number;
}
