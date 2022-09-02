package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.employeeSale.Sale
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

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>? = responseObjectMap.responseObject(saleService.findById(id))
}