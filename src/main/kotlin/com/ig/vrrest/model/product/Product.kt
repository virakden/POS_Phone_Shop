package com.ig.vrrest.model.product

import com.fasterxml.jackson.annotation.JsonIgnore
import com.ig.vrrest.base.model.BaseEntity
import com.ig.vrrest.model.employeeSale.SaleDetail
import javax.persistence.*

@Entity
class Product (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = 0,
        var productName: String? = null,
        var productCost: Double? = 0.0,
        var productPrice: Double? = 0.0,
        var description: String? = null,
        var stockAlert: Int? = 0,
//        var photo: String?= null,
        var stockAvailability: Int? = 0,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id")
        var category: Category? = null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "brand_id")
        var brand: Brand? = null,

        @JsonIgnore
        @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        var stockAdjustment: MutableList<StockAdjustment>? = null,

        @JsonIgnore
        @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        var saleDetail: MutableList<SaleDetail>?= null,

//        @JsonIgnore
        @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
        var photo: MutableList<Photo>?= null,

        ): BaseEntity()