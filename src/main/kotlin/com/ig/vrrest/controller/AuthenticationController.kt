package com.ig.vrrest.controller

import com.ig.vrrest.base.response.ResponseObjectMap
import com.ig.vrrest.excception.CustomException
import com.ig.vrrest.excception.HttpCode
import com.ig.vrrest.model.request.JwtRequest
import com.ig.vrrest.security.UserPrincipal
import com.ig.vrrest.services.JwtUserDetailsService
import com.ig.vrrest.utils.JwtTokenUtil
import com.ig.vrrest.utils.constant.AppConstant
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.DisabledException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(AppConstant.MAIN_PATH)
class AuthenticationController{

    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var jwtTokenUtil: JwtTokenUtil

    @Autowired
    lateinit var userDetailService: JwtUserDetailsService

    @Autowired
    lateinit var response: ResponseObjectMap

//    @Value("\${reset-password.aes.key}")
//    val key: String = ""
//
//    @Value("\${reset-password.aes.vec}")
//    val vec: String = ""


    @PostMapping("authenticate")
    fun createAuthenticationToken(@RequestBody authenticationRequest: JwtRequest): MutableMap<String, Any>? {
        /**
         * load user by email from db to authenticate
         * if match authentication then return user principle
         */
        val email: String = authenticationRequest.email

        val userDetail =
            userDetailService.loadUserByUsername(email)
                    as UserPrincipal

        authenticate(userDetail.username!!, authenticationRequest.password)
        val token = jwtTokenUtil.generateToken(userDetail)
        return response.responseObject(token)
    }


    @Throws(Exception::class)
    private fun authenticate(username: String, password: String) {
        try {
            authenticationManager.authenticate(UsernamePasswordAuthenticationToken(username, password))
        } catch (e: DisabledException) {
            throw Exception("USER_DISABLED", e)
        } catch (e: BadCredentialsException) {
            throw Exception(
                "INVALID_CREDENTIALS",
                CustomException(HttpCode.METHOD_NOT_ALLOWED, "Incorrect username or password")
            )
        }
    }
}