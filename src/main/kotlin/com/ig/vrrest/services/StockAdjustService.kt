package com.ig.vrrest.services

import com.ig.vrrest.base.service.BaseService
import com.ig.vrrest.model.product.StockAdjustment

interface StockAdjustService : BaseService<StockAdjustment> {
    fun addMore(t: List<StockAdjustment>): List<StockAdjustment>?
    fun updateStockByProductId(productId: Long, t: StockAdjustment): StockAdjustment?
}