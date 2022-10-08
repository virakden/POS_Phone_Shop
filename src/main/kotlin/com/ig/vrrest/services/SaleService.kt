package com.ig.vrrest.services
import com.ig.vrrest.model.Custom.SaleRequest
import com.ig.vrrest.model.employeeSale.Sale

interface SaleService {
    fun addSaleMore(t: SaleRequest): MutableMap<String,Any>
    fun addSale (sale: Sale): Sale
    fun findAll (): List<Sale>?
    fun findById (id: Long): Sale?
//    fun findLastSale (): Sale?
}