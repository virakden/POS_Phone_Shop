package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.Custom.ProductRequest
import com.ig.vrrest.model.product.Product
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
interface ProductRepo: BaseRepository<Product> {
    fun findAllByStatusTrue(): List<Product>?


    @Query("SELECT pd FROM Product pd JOIN Photo pt ON (pd.id = pt.product.id)")
    @Transactional
    fun findProduct(): List<ProductRequest>
//    interface UserRepo : JpaRepository<User, Long>
}