package com.ig.vrrest.services.implement

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.Custom.SaleRequest
import com.ig.vrrest.model.employeeSale.Sale
import com.ig.vrrest.model.employeeSale.SaleDetail
import com.ig.vrrest.repository.ProductRepo
import com.ig.vrrest.repository.SaleDetailRepository
import com.ig.vrrest.repository.SaleRepository
import com.ig.vrrest.services.SaleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SaleServiceImpl : SaleService {
    @Autowired
    lateinit var saleRepository: SaleRepository
    @Autowired
    lateinit var saleDetailRepository: SaleDetailRepository
    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap
    @Autowired lateinit var productRepository: ProductRepo

    @Autowired
    lateinit var documentarySettingImpl: DocumentarySettingImpl


    override fun addSale (sale: Sale): Sale = saleRepository.save(sale)

    override fun addSaleMore(t: SaleRequest): MutableMap<String, Any> {
        //synchronized(this) {
            val sales = saleRepository.save(
                Sale(
                    saleDate = t.saleDate,
                    customerName = t.customerName,
                    customerTelephone = t.customerTelephone,
                    discount = t.discount,
                    subTotal = t.subTotal,
                    total = t.total,
                    code = documentarySettingImpl.getNextCode(),

                )

            )
            val detail = t.saleDetail!!.forEach {

                val pro = productRepository.findByIdAndStatusTrue(it.product!!.id!!.toLong())

                saleDetailRepository.save(
                    SaleDetail(
                        sale = sales,
                        qty = it.qty,
                        product = pro
                    )
                )

                if (pro!!.stock!! >= it.qty!!.toInt()){
                    pro?.stock = pro?.stock?.minus(it.qty!!.toInt())

                } else {
                    return responseObjectMap.responseCodeWithMessage(500, "Not available Stock!!!")
                }

                if(pro!!.stock!! <= 0){
                    pro.status = false
                }else  if(pro!!.stock!! <=1){
                    pro.stockAlert = 0
                }
                else if(pro!!.stock!! >1){
                    pro.stockAlert =1
                }
                else{
                    pro!!.status= true
                }
                productRepository.save(pro)
            }

        return responseObjectMap.responseObject(saleRepository.getById(sales.id!!))

    }

    override fun findAll(): List<Sale>? {
        return saleRepository.findALlByStatusTrue()
    }

    override fun findById(id: Long): Sale? {
        return saleRepository.findByIdAndStatusTrue(id)
    }
}