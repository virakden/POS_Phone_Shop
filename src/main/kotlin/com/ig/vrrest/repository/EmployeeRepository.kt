package com.ig.vrrest.repository

import com.ig.vrrest.base.repository.BaseRepository
import com.ig.vrrest.model.employeeSale.Employee
import org.springframework.stereotype.Repository


@Repository
interface EmployeeRepository: BaseRepository<Employee> {
    fun findAllByStatusTrue(): List<Employee>?
    fun deleteByIdAndStatusTrue(id: Long): Employee?
    fun findByEmployeeEmailAndStatusTrue(emailEmployee: String): Employee?
}

