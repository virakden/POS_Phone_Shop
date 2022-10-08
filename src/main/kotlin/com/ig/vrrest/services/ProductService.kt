package com.ig.vrrest.services

import com.ig.vrrest.base.response.ResponseObject
import com.ig.vrrest.base.service.BaseService
import com.ig.vrrest.model.Custom.ProductRequest
import com.ig.vrrest.model.product.Product
import com.ig.vrrest.model.request.ImageRequest
import org.springframework.web.multipart.MultipartHttpServletRequest

interface ProductService : BaseService<Product> {

    fun addMore(t: List<Product>): List<Product>?
    fun addProduct(t: ProductRequest): MutableMap<String,Any>

    fun findProduct(): List<ProductRequest>
//    fun getImageById(fileName: String, request: HttpServletRequest): ResponseEntity<*>?
//    fun uploadImage(
//        id: Long,
//        image: MutableList<ImageRequest>
//    ): ResponseObject?
    fun uploadImage(
        id: Long,
        amountImage: Int,
        image: MultipartHttpServletRequest
    ): ResponseObject?
}