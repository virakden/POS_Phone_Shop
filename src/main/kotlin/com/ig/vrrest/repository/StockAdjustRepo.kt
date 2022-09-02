package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.product.StockAdjustment
import org.springframework.stereotype.Repository

@Repository
interface StockAdjustRepo : BaseRepository<StockAdjustment> {
    fun findAllByStatusTrue(): List<StockAdjustment>?
}