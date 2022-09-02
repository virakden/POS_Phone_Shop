package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.employeeSale.Employee
import com.ig.vrrest.services.EmployeeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/v1/employee")
class EmployeeController {

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var responseObjectMap: ResponseObjectMap

    @PostMapping
    fun addEmployee(@RequestBody employee: Employee): Employee {
        return employeeService.addEmployee(employee)
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): MutableMap<String, Any>? = responseObjectMap.responseObject(employeeService.findById(id))

    @GetMapping("/all")
    fun findAllEmployee(): MutableMap<String, Any> = responseObjectMap.responseObject(employeeService.findAll())

    @GetMapping("/list")
    fun getAllByList(word: String?, @RequestParam page: Int, size: Int): MutableMap<String, Any>? {
        val data = employeeService.findByList(word, page, size)
        return responseObjectMap.responseObject(data!!.content, data.totalElements)
    }

    @PutMapping("/update")
    fun updateEmployee(@RequestBody employee: Employee): Employee? = employeeService.updateEmployee(employee)

    @DeleteMapping("/{id}")
    fun deleteEmployee(@PathVariable id: Long): MutableMap<String, Any>? {
        return responseObjectMap.responseObject(employeeService.deleteEmployee(id))
    }

    @PutMapping("/upLoadImage/{id}")
    fun uploadImage(@PathVariable id: Long, @RequestParam image: MultipartFile): MutableMap<String, Any>? = responseObjectMap.responseObject(employeeService.uploadImage(id, image))

}