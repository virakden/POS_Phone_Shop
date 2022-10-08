package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.product.StockAdjustment
import com.ig.vrrest.model.request.StockAdjustmentRequest
import com.ig.vrrest.services.StockAdjustService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/stock-adjust")
class StockAdjustController {

    @Autowired
    lateinit var stockAdjustService: StockAdjustService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

//    ------add only one item--------
//    @PostMapping
//    fun addStockAdjust(@RequestBody stockAdjustment: StockAdjustment): StockAdjustment? {
//        return stockAdjustService.addNew(stockAdjustment)
//    }

//    -----add more than one------
    @PostMapping
    fun addStockAdjust(@RequestBody stockAdjustment: List<StockAdjustment>): List<StockAdjustment>? {
        return stockAdjustService.addMore(stockAdjustment)
    }



    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>?= responseObjectMap.responseObject(stockAdjustService.findAll())

    @GetMapping("/all")
    fun findAllStockAdjust(): MutableMap<String, Any> = responseObjectMap.responseObject(stockAdjustService.findAll())

    @GetMapping("/list")
    fun getAllByList(q: String?, @RequestParam page: Int, size: Int): MutableMap<String, Any>? {
        val data = stockAdjustService.findAllList(q, page, size)
        return responseObjectMap.responseObject(data!!.content, data.totalElements)
    }

    @PutMapping("/update/{productId}")
    fun updateStockAdjust(@PathVariable productId: Long, @RequestBody t: StockAdjustment): MutableMap<String, Any>{
        return responseObjectMap.responseObject(stockAdjustService.updateStockByProductId(productId, t))
    }
}
