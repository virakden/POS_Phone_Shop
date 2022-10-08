package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.employeeSale.Sale
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface SaleRepository : BaseRepository<Sale> {
    fun findALlByStatusTrue(): List<Sale>?

//    @Query("")
//    fun getLastId(): Sale?
}