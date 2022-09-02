package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.product.Product
import org.springframework.stereotype.Repository

@Repository
interface ProductRepo: BaseRepository<Product> {
    fun findAllByStatusTrue(): List<Product>?
//    interface UserRepo : JpaRepository<User, Long>
}