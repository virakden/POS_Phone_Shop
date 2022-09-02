package com.ig.vrrest.services

import com.ig.vrrest.model.employeeSale.Sale

interface SaleService {
    fun addSale (sale: Sale): Sale
    fun findAll (): List<Sale>?
    fun findById (id: Long): Sale?
}