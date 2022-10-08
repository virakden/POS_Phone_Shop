package com.ig.vrrest.model.product

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.ig.vrrest.base.model.BaseEntity
import javax.persistence.*

@Entity
class Photo (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = 0,
    var photoName: String?= null,
    var photoPath: String? = null,

    @JsonIgnoreProperties("hibernateLazyInitializer", "handler")
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY,cascade = [CascadeType.ALL])
    @JoinColumn(name = "product_id")
    var product: Product?= null

): BaseEntity()