package com.ig.vrrest.services

import com.ig.vrrest.base.service.BaseService
import com.ig.vrrest.model.product.Product
interface ProductService : BaseService<Product> {

    fun addMore(t: List<Product>): List<Product>?
}