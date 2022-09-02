package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.product.Category
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepo: BaseRepository<Category> {
    fun findAllByStatusTrue(): List<Category>?
}