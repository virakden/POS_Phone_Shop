package com.ig.vrrest.services

import com.ig.vrrest.base.response.ResponseObject
import com.ig.vrrest.base.service.BaseService
import com.ig.vrrest.model.product.Product
import com.ig.vrrest.model.request.ImageRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.multipart.MultipartHttpServletRequest
import javax.servlet.http.HttpServletRequest

interface ProductService : BaseService<Product> {
    fun addMore(t: List<Product>): List<Product>?
    fun getImageById(fileName: String, request: HttpServletRequest): ResponseEntity<*>?
    fun uploadImage(
        id: Long,
        image: MutableList<ImageRequest>
    ): ResponseObject?

    fun uploadImage(
        id: Long,
        amountImage: Int,
        image: MultipartHttpServletRequest
    ): ResponseObject?
}