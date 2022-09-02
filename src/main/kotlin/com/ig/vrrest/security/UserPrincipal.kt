package com.ig.vrrest.security

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserPrincipal(var id: Long, var name: String?, var pass: String, var auth: MutableCollection<out GrantedAuthority>?) : UserDetails {

    companion object {
        fun create(id: Long, name: String?, password: String, authorities: MutableCollection<out GrantedAuthority>?): UserPrincipal {
            return UserPrincipal(id, name, password, authorities)
        }
    }
    override fun getAuthorities(): MutableCollection<out GrantedAuthority>? {
       return this.auth
    }

    override fun getPassword(): String = this.pass

    override fun getUsername(): String? = this.name


    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = true

}
