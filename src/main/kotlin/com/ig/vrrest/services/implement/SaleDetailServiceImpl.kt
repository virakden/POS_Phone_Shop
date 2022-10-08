package com.ig.vrrest.services.implement

import com.ig.vrrest.model.employeeSale.SaleDetail
import com.ig.vrrest.repository.SaleDetailRepository
import com.ig.vrrest.services.SaleDetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class  SaleDetailServiceImpl : SaleDetailService {

    @Autowired
    lateinit var saleDetailRepository: SaleDetailRepository
    override fun addSaleDetail(saleDetail: SaleDetail): SaleDetail = saleDetailRepository.save(saleDetail)

    override fun findAll(): List<SaleDetail>? {
        return saleDetailRepository.findALlByStatusTrue()
    }

    override fun findById(id: Long): SaleDetail? {
        return saleDetailRepository.findByIdAndStatusTrue(id)
    }

    override fun updateSaleDetail(saleDetail: SaleDetail): SaleDetail? {
        val oldSaleDetail = findById(saleDetail.id!!)
        oldSaleDetail?.qty = saleDetail.qty

        return saleDetailRepository.save(oldSaleDetail!!)


    }
}
