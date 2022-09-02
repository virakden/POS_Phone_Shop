package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.product.Brand
import com.ig.vrrest.services.BrandService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/brand")
class BrandController {

    @Autowired
    lateinit var brandService: BrandService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

    @PostMapping
    fun addCategory(@RequestBody brand: Brand): Brand? {
        return brandService.addNew(brand)
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>?= responseObjectMap.responseObject(brandService.findAll())

    @GetMapping("/all")
    fun findAllBrand(): MutableMap<String, Any> = responseObjectMap.responseObject(brandService.findAll())

    @GetMapping("/list")
    fun getAllByList(q: String?, @RequestParam page: Int, size: Int): MutableMap<String, Any>? {
        val data = brandService.findAllList(q, page, size)
        return responseObjectMap.responseObject(data!!.content, data.totalElements)
    }

    @PutMapping("/update")
    fun updateBrand(@RequestBody id: Long, t: Brand): Brand?= brandService.updateObj(id,t)


}