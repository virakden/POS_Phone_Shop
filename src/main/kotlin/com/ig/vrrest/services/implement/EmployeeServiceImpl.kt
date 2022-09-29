package com.ig.vrrest.services.implement

import com.ig.vrrest.model.employeeSale.Employee
import com.ig.vrrest.repository.EmployeeRepository
import com.ig.vrrest.services.EmployeeService
import com.ig.vrrest.utils.FileUpload
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDateTime
import javax.persistence.criteria.Predicate
import javax.servlet.http.HttpServletRequest

@Service
class EmployeeServiceImpl : EmployeeService {
    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var bCryptPasswordEncoder: BCryptPasswordEncoder

    override fun addEmployee(employee: Employee): Employee {
        employee.password = bCryptPasswordEncoder.encode(employee.password)
        return employeeRepository.save( employee )
    }

    override fun findById(id: Long): Employee? {
        return employeeRepository.findByIdAndStatusTrue(id)
    }

    override fun findAll(): List<Employee>? {
        return employeeRepository.findAll()
    }

    override fun findByList(word: String?, page: Int, size: Int): Page<Employee>? {
        return employeeRepository.findAll({ root, _, cb ->
            val predicates = ArrayList<Predicate>()
            if (word != null) {
                val employeeName = cb.like(cb.upper(root.get("employeeName")), "%${word.toUpperCase()}%")
                val employeeEmail = cb.like(cb.upper(root.get("employeeEmail")), "%${word.toUpperCase()}%")
                val employeeTelephone = cb.like(cb.upper(root.get("employeeTelephone")), "%${word.toUpperCase()}%")
                predicates.add(cb.or(employeeName, employeeEmail, employeeTelephone))
            }
            predicates.add(cb.isTrue(root.get("status")))
            cb.and(*predicates.toTypedArray())
        }, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id")))
    }

    override fun updateEmployee( id: Long, employee: Employee): Employee? {
        val oldEmployee = employeeRepository.findById(id).get()
        oldEmployee?.employeeName = employee.employeeName
        oldEmployee?.employeeTelephone = employee.employeeTelephone
        oldEmployee?.status = employee.status
        return employeeRepository.save(oldEmployee)
    }

    override fun deleteEmployee(id: Long): Employee? {
        return employeeRepository.deleteByIdAndStatusTrue(id)
    }



//    @Value("\${image.path.empl}")
//    val imageFile: String? = null
//    override fun uploadImage(id: Long, image: MultipartFile): Employee {
//        val originatingEmployeeName = FileUpload.storeImage(image, imageFile!!)
//        println("originatingEmployeeName:"+originatingEmployeeName)
//        val employee = employeeRepository.findByIdAndStatusTrue(id)
//        employee!!.profilePhoto = originatingEmployeeName
//        return employeeRepository.save(employee)
//    }
//
//    override fun getImageById(fileName: String,  request: HttpServletRequest): ResponseEntity<*>? {
//        return try {
//            FileUpload.getFile(fileName, imageFile!!, request, true)
//        } catch (ex: Exception) {
//            println(""+ex)
//            null
//        }
//    }
}