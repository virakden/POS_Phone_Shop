package com.ig.vrrest.model.employeeSale


import com.ig.vrrest.base.model.BaseEntity
import java.util.*
import javax.persistence.*

@Entity
@Table(name= "tbl_employee")
class Employee(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = 0,
        var employeeName: String?= null,
        var employeeEmail: String?= null,
        var password: String?= null,
        var employeeTelephone: String?= null,
        var priority: String?= null,
        var profilePhoto: String?= null,
        var joinDate: Date? = null,
): BaseEntity()