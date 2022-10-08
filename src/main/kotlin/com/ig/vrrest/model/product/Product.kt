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
        var stock: Int? = 0,
//        var photo: String?= null,
        var stockAlert: Int? = 0,

//        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "category_id")
        var category: String? = null,

//        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "brand_id")
        var brand: String?= null,

        @JsonIgnore
        @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
        var stockAdjustment: MutableList<StockAdjustment>? = null,

        @JsonIgnore
        @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
        var saleDetail: MutableList<SaleDetail>?= null,

//        @JsonIgnore
        @OneToMany(fetch = FetchType.EAGER,mappedBy = "product",cascade = [CascadeType.ALL])
        var photo: MutableList<Photo>?= null,

        ): BaseEntity()