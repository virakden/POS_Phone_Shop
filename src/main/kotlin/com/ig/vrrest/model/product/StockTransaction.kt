package com.ig.vrrest.model.product

import com.ig.vrrest.base.model.BaseEntity
import com.ig.vrrest.model.employeeSale.Sale
import com.ig.vrrest.model.enumerate.TransactionType
import java.util.*
import javax.persistence.*

@Entity
class StockTransaction(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = 0,
        @Enumerated(EnumType.STRING)
        var transactionType: TransactionType?= null,
        var reference: String?= null,
        var qty: Long? = 0,
        var createByName: String? = null,
        var date: Date? = null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "stock_adjust_id")
        var stockAdjustment: StockAdjustment?= null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "sale_id")
        var sale: Sale?= null,

        ) : BaseEntity()