package com.ig.vrrest.services.implement

import com.ig.vrrest.model.product.Brand
import com.ig.vrrest.repository.BrandRepo
import com.ig.vrrest.services.BrandService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import javax.persistence.criteria.Predicate

@Service
class BrandServiceImpl : BrandService {

    @Autowired
    lateinit var brandRepo: BrandRepo

    override fun findAllList(q: String?, page: Int, size: Int): Page<Brand>? {
        return brandRepo.findAll({ root, _, cb ->
            val predicates = ArrayList<Predicate>()
            if (q != null) {
                val brandName = cb.like(cb.upper(root.get("brandName")), "%${q.toUpperCase()}%")
                predicates.add(cb.or(brandName))
            }
            predicates.add(cb.isTrue((root.get("status"))))
            cb.and(*predicates.toTypedArray())
        }, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id")))
    }

    override fun findById(id: Long): Brand? {
        return brandRepo.findByIdAndStatusTrue(id)
    }

    override fun addNew(t: Brand): Brand = brandRepo.save(t)

    override fun updateObj(id: Long, t: Brand): Brand? {
        val oldBrand = findById(t.id!!)
        oldBrand?.brandName = t.brandName

        return brandRepo.save(oldBrand!!)
    }

    override fun findAll(): List<Brand>? {
        return brandRepo.findAllByStatusTrue()
    }
}