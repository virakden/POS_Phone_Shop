package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.product.Product
import com.ig.vrrest.services.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartHttpServletRequest
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/v1/product")
class ProductController {

    @Autowired
    lateinit var productService: ProductService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

//    @PostMapping
//    fun addProduct(@RequestBody product: Product): Product? {
//        return productService.addNew(product)
//    }

    @PostMapping
    fun addProduct (@RequestBody product: List<Product>): List<Product>? {
        return productService.addMore(product)
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>? = responseObjectMap.responseObject(productService.findById(id))

    @GetMapping("/all")
    fun findAllProduct(): MutableMap<String, Any> = responseObjectMap.responseObject(productService.findAll())

    @GetMapping("/list")
    fun getAllByList(q: String?, @RequestParam page: Int, size: Int): MutableMap<String, Any>? {
        val data = productService.findAllList(q, page, size)
        return responseObjectMap.responseObject(data!!.content, data.totalElements)
    }

    @PutMapping("/update")
    fun updateProduct(@RequestBody id: Long, t: Product): Product? = productService.updateObj(id,t)

    @PutMapping("/upLoadPhoto/{id}")
//    fun uploadPhoto(@PathVariable id: Long, image: MutableList<ImageRequest>): MutableMap<String, Any>? =
//        responseObjectMap.responseObject(productService.uploadImage(id, image)
//    )
    fun uploadPhoto(@PathVariable id: Long, amountImage: Int, image: MultipartHttpServletRequest
    ): MutableMap<String, Any>? =
        responseObjectMap.responseObject(productService.uploadImage(id, amountImage, image)
    )


    @GetMapping("/image/{image}")
    fun getImage(@PathVariable image: String, request: HttpServletRequest): ResponseEntity<*>? {
        return productService.getImageById(image , request)
    }





}