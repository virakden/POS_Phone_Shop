package com.ig.vrrest.services.implement

import com.ig.vrrest.base.storage.StorageService
import com.ig.vrrest.model.product.Product
import com.ig.vrrest.repository.PhotoRepo
import com.ig.vrrest.repository.ProductRepo
import com.ig.vrrest.services.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import javax.persistence.criteria.Predicate

@Service
class ProductServiceImpl : ProductService {

    @Autowired
    lateinit var productRepo: ProductRepo

    @Autowired
    lateinit var photoRepo: PhotoRepo
    @Autowired
    lateinit var storageService: StorageService

    override fun addNew(t: Product): Product = productRepo.save(t)

    override fun addMore(t: List<Product>): List<Product>? {
        return productRepo.saveAll(t)
    }

    override fun findById(id: Long): Product? {
        return productRepo.findByIdAndStatusTrue(id)
    }

    override fun findAll(): List<Product>? {
        return productRepo.findAllByStatusTrue()
    }

    override fun findAllList(q: String?, page: Int, size: Int): Page<Product>? {
        return productRepo.findAll({ root, _, cb ->
            val predicates = ArrayList<Predicate>()
            if (q != null) {
                val productName = cb.like(cb.upper(root.get("productName")), "%${q.toUpperCase()}%")
                val productPrice = cb.like(cb.upper(root.get("productPrice")), "%${q.toUpperCase()}%")
                predicates.add(cb.or(productName, productPrice))
            }
            predicates.add(cb.isTrue((root.get("status"))))
            cb.and(*predicates.toTypedArray())
        }, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id")))
    }


    override fun updateObj(id: Long, t: Product): Product? {
        val oldProduct = productRepo.findById(id).get()
        oldProduct.productName = t.productName
        oldProduct.productCost = t.productCost
        oldProduct.productPrice = t.productPrice
        oldProduct.description = t.description
        oldProduct.stockAlert = t.stockAlert

        return productRepo.save(oldProduct)
    }

    @Value("\${image.path}")
    val photoFile: String? = null



}