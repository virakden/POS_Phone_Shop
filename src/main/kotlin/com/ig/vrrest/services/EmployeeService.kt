package com.ig.vrrest.services

import com.ig.vrrest.model.employeeSale.Employee
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletRequest


interface EmployeeService {
    fun addEmployee (employee: Employee): Employee
    fun findById (id: Long): Employee?
    fun findAll (): List<Employee>?
    fun findByList(word: String?, page: Int, size: Int): Page<Employee>?
    fun updateEmployee (id: Long, employee: Employee): Employee?
    fun deleteEmployee (id: Long): Employee?
//    fun uploadImage(id: Long, image: MultipartFile): Employee
//    fun getImageById(fileName: String, request: HttpServletRequest): ResponseEntity<*>?

}