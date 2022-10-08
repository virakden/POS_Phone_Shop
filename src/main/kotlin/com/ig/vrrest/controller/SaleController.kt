package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.Custom.SaleRequest
import com.ig.vrrest.model.employeeSale.Sale
import com.ig.vrrest.model.product.Product
import com.ig.vrrest.services.SaleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/v1/sale")
class SaleController {

    @Autowired
    lateinit var saleService: SaleService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

    @PostMapping
    fun addSale(@RequestBody sale: Sale): Sale {
        return saleService.addSale(sale)
    }

    @GetMapping("/all")
    fun findAllSale(): MutableMap<String, Any> = responseObjectMap.responseObject(saleService.findAll())

    @PostMapping("/add-more")
    fun addSaleMore (@RequestBody sale: SaleRequest): MutableMap<String,Any> {
        return  saleService.addSaleMore(sale)
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>? = responseObjectMap.responseObject(saleService.findById(id))

//    @GetMapping("/last-id")
//    fun findLastById(): MutableMap<String, Any>? = responseObjectMap.responseObject(saleService.findLastSale())
}