package com.ig.vrrest.services.implement

import com.ig.vrrest.model.product.StockTransaction
import com.ig.vrrest.repository.StockTrasacRepo
import com.ig.vrrest.services.StockTrasacService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import javax.persistence.criteria.Predicate

@Service
class StockTrasacServiceImpl : StockTrasacService {

    @Autowired
    lateinit var stockTrasacRepo: StockTrasacRepo

    override fun findAllList(q: String?, page: Int, size: Int): Page<StockTransaction>? {
        return stockTrasacRepo.findAll({ root, _, cb ->
            val predicates = ArrayList<Predicate>()
            if (q != null) {
                val transactionType = cb.like(cb.upper(root.get("transactionType")), "%${q.toUpperCase()}%")
                val reference = cb.like(cb.upper(root.get("reference")), "%${q.toUpperCase()}%")
                predicates.add(cb.or(transactionType, reference))
            }
            predicates.add(cb.isTrue((root.get("status"))))
            cb.and(*predicates.toTypedArray())
        }, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id")))

    }

    override fun findById(id: Long): StockTransaction? {
        return stockTrasacRepo.findByIdAndStatusTrue(id)
    }

    override fun addNew(t: StockTransaction): StockTransaction = stockTrasacRepo.save(t)

    override fun updateObj(id: Long, t: StockTransaction): StockTransaction? {
        val oldStockTransaction = findById(t.id!!)
        oldStockTransaction?.transactionType = t.transactionType

        return stockTrasacRepo.save(oldStockTransaction!!)
    }

    override fun findAll(): List<StockTransaction>? {
        return stockTrasacRepo.findAllByStatusTrue()
    }
}