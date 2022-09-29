package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.model.employeeSale.Employee
import com.ig.vrrest.services.EmployeeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletRequest

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

    @PutMapping("/update/{id}")
    fun updateEmployee(@PathVariable id: Long, @RequestBody employee: Employee): MutableMap<String, Any>{
        return responseObjectMap.responseObject(employeeService.updateEmployee(id, employee))
    }

    @DeleteMapping("/{id}")
    fun deleteEmployee(@PathVariable id: Long): MutableMap<String, Any>? {
        return responseObjectMap.responseObject(employeeService.deleteEmployee(id))
    }

//    @PutMapping("/upLoadImage/{id}")
//    fun uploadImage(@PathVariable id: Long, @RequestBody profilePhoto: MultipartFile):
//            MutableMap<String, Any>? = responseObjectMap.responseObject(employeeService.uploadImage(id, profilePhoto))
//
//    @GetMapping("/image/{image}")
//    fun getImage(@PathVariable image: String, request: HttpServletRequest): ResponseEntity<*>? {
//        return employeeService.getImageById(image , request)
//    }

}