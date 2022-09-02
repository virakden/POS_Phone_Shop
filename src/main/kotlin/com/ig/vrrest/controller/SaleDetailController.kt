package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.employeeSale.SaleDetail
import com.ig.vrrest.services.SaleDetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/v1/saledetail")
class SaleDetailController {

    @Autowired
    lateinit var saleDetailService: SaleDetailService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

    @PostMapping
    fun addSale(@RequestBody saleDetail: SaleDetail): SaleDetail {
        return saleDetailService.addSaleDetail(saleDetail)
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>?= responseObjectMap.responseObject(saleDetailService.findById(id))

    @GetMapping("/all")
    fun findAllSaleDetail(): MutableMap<String, Any> = responseObjectMap.responseObject(saleDetailService.findAll())

    @PutMapping("/update")
    fun updateSaleDetail(@RequestBody saleDetail: SaleDetail): SaleDetail?= saleDetailService.updateSaleDetail(saleDetail)
}