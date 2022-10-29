package com.ig.vrrest.model.Custom

import com.ig.vrrest.model.product.Photo

data class ProductRequest (
        var id: Int,
        var productName: String? = null,
        var productCost: Double? = 0.0,
        var productPrice: Double? = 0.0,
        var description: String? = null,
        var stock: Int? = 0,
        var stockAlert: Int? = 0,
        var category: String? = null,
        var brand: String?= null,
        var photo:MutableList<Photo>


)