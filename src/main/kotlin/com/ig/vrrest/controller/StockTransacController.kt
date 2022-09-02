package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.product.StockTransaction
import com.ig.vrrest.services.StockTrasacService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/v1/stock-transac")
class StockTransacController {

    @Autowired
    lateinit var stockTrasacService: StockTrasacService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

    @PostMapping
    fun addStockTrasac(@RequestBody stockTransaction: StockTransaction): StockTransaction? {
        return stockTrasacService.addNew(stockTransaction)
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>?= responseObjectMap.responseObject(stockTrasacService.findAll())

    @GetMapping("/all")
    fun findAllStockTransac(): MutableMap<String, Any> = responseObjectMap.responseObject(stockTrasacService.findAll())

    @GetMapping("/list")
    fun getAllByList(q: String?, @RequestParam page: Int, size: Int): MutableMap<String, Any>? {
        val data = stockTrasacService.findAllList(q, page, size)
        return responseObjectMap.responseObject(data!!.content, data.totalElements)
    }

    @PutMapping("/update")
    fun updateStockTransac(@RequestBody id: Long, t: StockTransaction): StockTransaction?= stockTrasacService.updateObj(id,t)

}