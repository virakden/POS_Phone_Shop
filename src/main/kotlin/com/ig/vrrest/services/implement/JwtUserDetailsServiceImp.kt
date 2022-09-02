package com.ig.vrrest.services.implement

import com.ig.vrrest.services.JwtUserDetailsService
import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.excception.CustomException
import com.ig.vrrest.excception.HttpCode
import com.ig.vrrest.model.employeeSale.Employee
import com.ig.vrrest.repository.EmployeeRepository
import com.ig.vrrest.security.UserPrincipal
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.DisabledException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class JwtUserDetailsServiceImp : JwtUserDetailsService {

    @Autowired
    lateinit var employeeRepository: EmployeeRepository


    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var bCryptEncoder: PasswordEncoder

    @Autowired
    lateinit var response: ResponseObjectMap



    override fun getAuthority(employee: Employee): MutableSet<GrantedAuthority> {
        val authorities: MutableSet<GrantedAuthority> = HashSet()
        authorities.add(SimpleGrantedAuthority("ROLE_ADMIN"))
        return authorities
    }


    // Implement Cacheable to authenticate merchant users from caches to improve service performance
    //@Cacheable(value = ["merchant_users"], key = "#email")
    override fun loadUserByUsername(email: String?): UserDetails {
        val emp = employeeRepository.findByEmployeeEmailAndStatusTrue(email!!)
            ?: throw UsernameNotFoundException("User not found with email: $email")
        //logger.info("Get user from database!!")
        return UserPrincipal(emp.id!!, emp.employeeEmail, emp.password ?: "", getAuthority(emp))
    }


    @Throws(Exception::class)
    private fun authenticate(username: String, password: String) {
        try {
            authenticationManager.authenticate(UsernamePasswordAuthenticationToken(username, password))
        } catch (e: DisabledException) {
            throw Exception("USER_DISABLED", e)
        } catch (e: BadCredentialsException) {
            throw CustomException(HttpCode.INVALID_CREDENTIALS, "Sorry, your current password is incorrect. Please try again.")
        }
    }
}
