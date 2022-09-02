package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.product.Brand
import org.springframework.stereotype.Repository

@Repository
interface BrandRepo: BaseRepository<Brand> {
    fun findAllByStatusTrue(): List<Brand>?
}