package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.product.StockTransaction
import org.springframework.stereotype.Repository

@Repository
interface StockTrasacRepo : BaseRepository<StockTransaction> {
    fun findAllByStatusTrue(): List<StockTransaction>?
}