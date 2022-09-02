package com.ig.vrrest.services

import com.ig.vrrest.model.employeeSale.Employee
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetailsService

interface JwtUserDetailsService : UserDetailsService {
    fun getAuthority(employee: Employee): MutableSet<GrantedAuthority>
}