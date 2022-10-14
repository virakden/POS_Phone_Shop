package com.ig.vrrest.services.implement

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.exception.CustomException
import com.ig.vrrest.exception.HttpCode
import com.ig.vrrest.model.enumerate.AdjustmentType
import com.ig.vrrest.model.product.Product
import com.ig.vrrest.model.product.StockAdjustment
import com.ig.vrrest.model.request.StockAdjustmentRequest
import com.ig.vrrest.repository.ProductRepo
import com.ig.vrrest.repository.StockAdjustRepo
import com.ig.vrrest.services.StockAdjustService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import javax.persistence.criteria.Predicate

@Service
class StockAdjustServiceImpl : StockAdjustService {

    @Autowired
    lateinit var stockAdjustRepo: StockAdjustRepo

    @Autowired
    lateinit var productRepo: ProductRepo
    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

    override fun findAllList(q: String?, page: Int, size: Int): Page<StockAdjustment>? {
        return stockAdjustRepo.findAll({ root, _, cb ->
            val predicates = ArrayList<Predicate>()
            if (q != null) {
                val adjustmentType = cb.like(cb.upper(root.get("adjustmentType")), "%${q.toUpperCase()}%")
                val code = cb.like(cb.upper(root.get("code")), "%${q.toUpperCase()}%")
                predicates.add(cb.or(adjustmentType, code))
            }
            predicates.add(cb.isTrue((root.get("status"))))
            cb.and(*predicates.toTypedArray())
        }, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id")))
    }

    override fun findById(id: Long): StockAdjustment? {
        return stockAdjustRepo.findByIdAndStatusTrue(id)
    }

    override fun addNew(t: StockAdjustment): StockAdjustment = stockAdjustRepo.save(t)

    override fun addMore(t: List<StockAdjustment>): List<StockAdjustment>? {
        return stockAdjustRepo.saveAll(t)
    }

    override fun updateObj(id: Long, t: StockAdjustment): StockAdjustment? {
        val oldStockAdjustment = findById(t.id!!)
        oldStockAdjustment?.adjustmentType = t.adjustmentType

        return stockAdjustRepo.save(oldStockAdjustment!!)
    }

    /*    override fun updateStockByProductId(t: StockAdjustmentRequest): StockAdjustment? {
            val product = productRepo.findByIdAndStatusTrue(t.productId!!)
            println(jacksonObjectMapper().writeValueAsString(t))
            return if (t.adjustmentType == AdjustmentType.ADD_STOCK) {
                product!!.stock = product.stock?.plus(t.qty!!)
                productRepo.save(product)
                stockAdjustRepo.save(StockAdjustment(adjustmentType = t.adjustmentType, qty = t.qty, product = product))
            } else if (t.adjustmentType == AdjustmentType.Deduct && product!!.stock!!.minus(t.qty!!) > 0){
                product.stock = product.stock?.minus(t.qty!!.toInt())
                productRepo.save(product)
                stockAdjustRepo.save(StockAdjustment(adjustmentType = t.adjustmentType, qty = t.qty, product = product))
            } else {
                StockAdjustment(null)
            }
        }*/
    override fun updateStockByProductId(productId: Long, t: StockAdjustment): MutableMap<String,Any>? {
        val product = productRepo.findByIdAndStatusTrue(productId)
//        println(product!!.id)
//        if (t.adjustmentType == AdjustmentType.ADD_STOCK) {
//            product!!.stock = product.stock?.plus(t.qty!!)
//            productRepo.save(product)
//            stockAdjustRepo.save(StockAdjustment(adjustmentType = t.adjustmentType, qty = t.qty, reason = t.reason, product = product))
//        } else if (t.adjustmentType == AdjustmentType.Deduct && product!!.stock!!.minus(t.qty!!) > 0) {
//            product.stock = product.stock?.minus(t.qty!!.toInt())
//            productRepo.save(product)
//             stockAdjustRepo.save(StockAdjustment(adjustmentType = t.adjustmentType, qty = t.qty, product = product))
//        } else {
////           return throw CustomException(HttpCode.BAD_REQUEST, "Can not")
//            return responseObjectMap.responseCodeWithMessage(500,"Not Available")
//
//
//        }
//        return null
//        println(jacksonObjectMapper().writeValueAsString(t))
        return responseObjectMap.responseObject(if (t.adjustmentType == AdjustmentType.ADD_STOCK) {
            product!!.stock = product.stock?.plus(t.qty!!)
            productRepo.save(product)
            stockAdjustRepo.save(StockAdjustment(adjustmentType = t.adjustmentType, qty = t.qty, reason = t.reason, product = product))
        } else if (t.adjustmentType == AdjustmentType.Deduct && product!!.stock!!.minus(t.qty!!) > 0) {
            product.stock = product.stock?.minus(t.qty!!.toInt())
            productRepo.save(product)
            stockAdjustRepo.save(StockAdjustment(adjustmentType = t.adjustmentType, qty = t.qty, product = product))
        } else {
//           return throw CustomException(HttpCode.BAD_REQUEST, "Can not")
            return responseObjectMap.responseCodeWithMessage(500,"Not Available")

        }
        )
    }

    override fun findAll(): List<StockAdjustment>? {
        return stockAdjustRepo.findAllByStatusTrue()
    }
}