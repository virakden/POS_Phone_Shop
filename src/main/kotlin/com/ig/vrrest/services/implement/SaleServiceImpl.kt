package com.ig.vrrest.services.implement

import com.ig.vrrest.model.employeeSale.Sale
import com.ig.vrrest.repository.SaleRepository
import com.ig.vrrest.services.SaleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SaleServiceImpl : SaleService {
    @Autowired
    lateinit var saleRepository: SaleRepository
    override fun addSale (sale: Sale): Sale = saleRepository.save(sale)

    override fun findAll(): List<Sale>? {
        return saleRepository.findALlByStatusTrue()
    }

    override fun findById(id: Long): Sale? {
        return saleRepository.findByIdAndStatusTrue(id)
    }
}