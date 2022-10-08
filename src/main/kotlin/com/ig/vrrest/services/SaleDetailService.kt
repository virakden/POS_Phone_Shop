package com.ig.vrrest.services

import com.ig.vrrest.model.employeeSale.SaleDetail

interface SaleDetailService {
    fun addSaleDetail (saleDetail: SaleDetail): SaleDetail
    fun findAll (): List<SaleDetail>?
    fun findById (id: Long): SaleDetail?
    fun updateSaleDetail (saleDetail: SaleDetail): SaleDetail?
//    fun getLastSaleDetail ()
}