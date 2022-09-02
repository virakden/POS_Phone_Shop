package com.ig.vrrest.controller
import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.product.Category
import com.ig.vrrest.services.CategoryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/category")
class CategoryController {

    @Autowired
    lateinit var categoryService: CategoryService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

    @PostMapping
    fun addCategory(@RequestBody category: Category): Category? {
        return categoryService.addNew(category)
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>?= responseObjectMap.responseObject(categoryService.findAll())

    @GetMapping("/all")
    fun findAllCategory(): MutableMap<String, Any> = responseObjectMap.responseObject(categoryService.findAll())

    @GetMapping("/list")
    fun getAllByList(q: String?, @RequestParam page: Int, size: Int): MutableMap<String, Any>? {
        val data = categoryService.findAllList(q, page, size)
        return responseObjectMap.responseObject(data!!.content, data.totalElements)
    }

    @PutMapping("/update")
    fun updateCategory(@RequestBody id: Long, t: Category): Category?= categoryService.updateObj(id,t)


}