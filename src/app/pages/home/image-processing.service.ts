import { FileHandle } from './../../core/models/file-handle';
import { ProductModel } from './products/products.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor() { }

  public createImages (product: ProductModel){
    const productImages: any[] = product.photo;

    const ProductImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++){
        const imageFileData = productImages[i];
    }
  }
}
