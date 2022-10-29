package com.ig.vrrest.model.Custom

import com.ig.vrrest.model.employeeSale.Sale
import com.ig.vrrest.model.employeeSale.SaleDetail
import com.ig.vrrest.model.product.Product
import java.util.*
import javax.persistence.FetchType
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

data class SaleRequest(

    var id: Long? = 0,
    var customerName: String?= null,
    var customerTelephone: String?= null,
    var code: String?= null,
    var saleDate: Date? = null,
    var discount: Double? = null,
    var subTotal: Double?= null,
    var total: Double?= null,
    var saleDetail: MutableList<SaleDetail>

    )

data class SaleDetailRequest(
    var id: Long? = 0,
    var qty: Long? = 0,
    var discount: Double? = 0.00,
    var subTotal: Double? = 0.00,
    var total: Double? = 0.00,
    var sale: Sale? = null,
//    var product: nt? = null,
)
