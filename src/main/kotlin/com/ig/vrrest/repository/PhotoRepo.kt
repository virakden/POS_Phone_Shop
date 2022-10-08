package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.product.Photo
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface PhotoRepo : BaseRepository<Photo> {

    @Query("SELECT * From photo WHERE product_id = :product_id  \n" +
            "ORDER BY random()\n" +
            "limit 1", nativeQuery = true)
    fun getRandomPhotoByProduct(@Param("product_id")id: Long):Photo
}