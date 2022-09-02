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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import javax.persistence.criteria.Predicate

@Service
class EmployeeServiceImpl : EmployeeService {
    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var bCryptPasswordEncoder: BCryptPasswordEncoder

    override fun addEmployee(employee: Employee): Employee {
        employee.password = bCryptPasswordEncoder.encode(employee.password)
        return employeeRepository.save(employee)
    }

    override fun findById(id: Long): Employee? {
        return employeeRepository.findByIdAndStatusTrue(id)
    }

    override fun findAll(): List<Employee>? {
        return employeeRepository.findAllByStatusTrue()
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

    override fun updateEmployee(employee: Employee): Employee? {
        val oldEmployee = findById(employee.id!!)
        oldEmployee?.employeeName = employee.employeeName
        oldEmployee?.employeeTelephone = employee.employeeTelephone

        return employeeRepository.save(oldEmployee!!)
    }

    override fun deleteEmployee(id: Long): Employee? {
        return employeeRepository.deleteByIdAndStatusTrue(id)
    }

    @Value("\${image.path}")
    val imageFile: String? = null
    override fun uploadImage(id: Long, image: MultipartFile): Employee {
        val originatingEmployeeName = FileUpload.storeImage(image, imageFile!!)
        val employee = employeeRepository.findByIdAndStatusTrue(id)
        employee!!.profilePhoto = originatingEmployeeName
        return employeeRepository.save(employee)
    }
}