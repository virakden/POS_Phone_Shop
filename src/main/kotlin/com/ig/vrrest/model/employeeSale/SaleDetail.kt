package com.ig.vrrest.model.employeeSale

import com.ig.vrrest.base.model.BaseEntity
import com.ig.vrrest.model.product.Product
import javax.persistence.*

@Entity
class SaleDetail(
    @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = 0,
    var qty: Long? = 0,
    var discount: Double? = 0.00,
    var subTotal: Double? = 0.00,
    var Total: Double? = 0.00,

    @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "sale_id")
        var sale: Sale? = null,

    @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "product_id")
        var product: Product? = null,
): BaseEntity()