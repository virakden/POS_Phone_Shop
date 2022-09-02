package com.ig.vrrest.services.implement

import com.ig.vrrest.model.product.Category
import com.ig.vrrest.repository.CategoryRepo
import com.ig.vrrest.services.CategoryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import javax.persistence.criteria.Predicate

@Service
class CategoryServiceImpl : CategoryService {
    @Autowired
    lateinit var categoryRepo: CategoryRepo

    override fun findAllList(q: String?, page: Int, size: Int): Page<Category>? {
        return categoryRepo.findAll({ root, _, cb ->
            val predicates = ArrayList<Predicate>()
            if (q != null) {
                val categoryName = cb.like(cb.upper(root.get("categoryName")), "%${q.toUpperCase()}%")
                predicates.add(cb.or(categoryName))
            }
            predicates.add(cb.isTrue((root.get("status"))))
            cb.and(*predicates.toTypedArray())
        }, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id")))
    }

    override fun findById(id: Long): Category? {
        return categoryRepo.findByIdAndStatusTrue(id)
    }

    override fun addNew(t: Category): Category = categoryRepo.save(t)


    override fun updateObj(id: Long, t: Category): Category? {
        val oldCategory = findById(t.id!!)
        oldCategory?.categoryName = t.categoryName

        return categoryRepo.save(oldCategory!!)
    }

    override fun findAll(): List<Category>? {
        return categoryRepo.findAllByStatusTrue()
    }
}