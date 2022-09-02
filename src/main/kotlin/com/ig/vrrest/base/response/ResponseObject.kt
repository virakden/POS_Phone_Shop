package com.ig.vrrest.base.response

import org.springframework.stereotype.Component

@Component
class ResponseObject(var status : Int ?= 0, var message: String ?= null) {
    fun success(): ResponseObject = ResponseObject(200, "Success")
    fun error(): ResponseObject = ResponseObject(404, "Error object not found")
}