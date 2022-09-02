package com.ig.vrrest.model.employeeSale

import com.fasterxml.jackson.annotation.JsonIgnore
import com.ig.vrrest.base.model.BaseEntity
import com.ig.vrrest.model.product.StockTransaction
import java.util.*
import javax.persistence.*

@Entity
class Sale(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = 0,
        var customerName: String?= null,
        var customerTelephone: String?= null,
        var code: String?= null,
        var saleDate: Date? = null,

        @OneToMany(mappedBy = "sale", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        @JsonIgnore
        var stockTransaction: MutableList<StockTransaction>? = null,

        @OneToMany(mappedBy = "sale", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        @JsonIgnore
        var saleDetail: MutableList<SaleDetail>?= null

): BaseEntity()