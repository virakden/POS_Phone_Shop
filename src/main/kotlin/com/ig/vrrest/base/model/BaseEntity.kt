package com.ig.vrrest.base.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
open class BaseEntity {
    @Column(name = "status", nullable = true, columnDefinition = "boolean default true")
    var status: Boolean = true

    @Column(name = "version")
    @Version
    var version: Int? = 0

    @JsonIgnore
    @Column(name = "date_created")
    var created: Date? = null







    /**
    *
    */
    @PrePersist
    protected fun onCreate() {
        created = Date()
    }

    /**
    *
    */

}