package com.ig.vrrest.base.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
open class BaseEntity {
    @Column(name = "status", nullable = false, columnDefinition = "boolean default true")
    var status: Boolean = true

    @Column(name = "version")
    @Version
    var version: Int? = 0

    @JsonIgnore
    @Column(name = "date_created")
    var created: Date? = null

    @JsonIgnore
    @Column(name = "last_updated")
    var updated: Date? = null

    @JsonIgnoreProperties(allowSetters = true)
    // @JsonIgnore
    @Column(name = "created_by_id")
    var createById: Int? = null

    @JsonIgnoreProperties(allowSetters = true)
    // @JsonIgnore
    @Column(name = "updated_by_id")
    var updatedById: Int? = null

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
    @PreUpdate
    protected fun onUpdate() {
        updated = Date()
    }
}