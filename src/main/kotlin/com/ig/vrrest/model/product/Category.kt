package com.ig.vrrest.model.product

import com.fasterxml.jackson.annotation.JsonIgnore
import com.ig.vrrest.base.model.BaseEntity
import javax.persistence.*

@Entity
class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long?= 0,
        var categoryName: String?= null,


        @JsonIgnore
        @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        var product: MutableList<Product>? = null


): BaseEntity()