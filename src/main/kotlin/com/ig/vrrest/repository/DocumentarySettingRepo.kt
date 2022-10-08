package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.code.DocumentarySetting
import org.springframework.stereotype.Repository

@Repository
interface DocumentarySettingRepo: BaseRepository<DocumentarySetting> {
//    fun findALlByStatusTrue(id: Long): List<DocumentarySetting>?
    fun findByNameAndStatusTrue(name: String): DocumentarySetting?
}