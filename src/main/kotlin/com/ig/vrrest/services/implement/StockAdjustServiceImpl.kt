package com.ig.vrrest.services.implement

import com.ig.vrrest.model.product.StockAdjustment
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

    override fun findAll(): List<StockAdjustment>? {
        return stockAdjustRepo.findAllByStatusTrue()
    }
}