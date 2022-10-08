package com.ig.vrrest.model.product

import com.ig.vrrest.base.model.BaseEntity
import com.ig.vrrest.model.enumerate.AdjustmentType

import javax.persistence.*

@Entity
class StockAdjustment(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = 0,
        @Enumerated(EnumType.STRING)
        var adjustmentType: AdjustmentType?= null,
        var qty: Int? = 0,
//        var code: String?= null,
        var reason: String? = null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "product_id")
        var product: Product?= null,

        @OneToMany(mappedBy = "stockAdjustment", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        var stockTransaction: MutableList<StockTransaction>? = null

): BaseEntity()