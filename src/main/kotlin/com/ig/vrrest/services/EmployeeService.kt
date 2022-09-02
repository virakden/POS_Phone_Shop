package com.ig.vrrest.services

import com.ig.vrrest.model.employeeSale.Employee
import org.springframework.data.domain.Page
import org.springframework.web.multipart.MultipartFile


interface EmployeeService {
    fun addEmployee (employee: Employee): Employee
    fun findById (id: Long): Employee?
    fun findAll (): List<Employee>?
    fun findByList(word: String?, page: Int, size: Int): Page<Employee>?
    fun updateEmployee (employee: Employee): Employee?
    fun deleteEmployee (id: Long): Employee?
    fun uploadImage(id: Long, image: MultipartFile): Employee
}