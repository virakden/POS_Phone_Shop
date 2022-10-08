export interface ProductModel {
    id: string;
    productName: string;
    productCost: string;
    productPrice: string;
    description: string;
    stock: any;
    stockAvailability: number;
    photo: Array<PhotosProduct>;
    category: string;
    brand: string;
    status: boolean;
    version: number;
    select:Boolean;
}

export interface PhotosProduct {
    id: string;
    photoName: string;
    photoPath: string;
    status: boolean;
    version: number;
}
