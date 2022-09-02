package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.employeeSale.SaleDetail
import org.springframework.stereotype.Repository

@Repository
interface SaleDetailRepository : BaseRepository<SaleDetail> {
    fun findALlByStatusTrue(): List<SaleDetail>?
}