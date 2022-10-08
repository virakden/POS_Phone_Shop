package com.ig.vrrest.model.request

import com.ig.vrrest.model.enumerate.AdjustmentType

data class StockAdjustmentRequest(
    var productId: Long? = 0,
    var adjustmentType: AdjustmentType? = null,
    var qty: Int? = 0
)