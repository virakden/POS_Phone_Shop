package com.ig.vrrest.base.response

import com.ig.vrrest.base.response.ResponseObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import kotlin.collections.HashMap

@Component
class ResponseObjectMap {
    @Autowired
    lateinit var responseObject: ResponseObject

    fun responseObject(obj: Any?, totalElements: Long): MutableMap<String, Any> {
        val response: MutableMap<String, Any> = HashMap()
        if (obj != null) {
            response["results"] = obj
            response["length"] = totalElements
            response["response"] = responseObject.success()
        } else {
            response["response"] = responseObject.error()
        }
        return response
    }

    fun responseObject(obj: Any?, totalElements: Long, page: Int, size: Int): MutableMap<String, Any> {
        val response: MutableMap<String, Any> = HashMap()
        if (obj != null) {
            response["size"] = size
            response["page"] = page
            response["results"] = obj
            response["length"] = totalElements
            response["response"] = responseObject.success()
            response["totalPage"] = (totalElements + size - 1).div(size)
        } else {
            response["response"] = responseObject.error()
        }
        return response
    }

    fun responseObject(obj: Any?): MutableMap<String, Any> {
        val response: MutableMap<String, Any> = HashMap()
        if (obj != null) {
            response["results"] = obj
            response["response"] = responseObject.success()
        } else {
            response["response"] = responseObject.error()
        }
        return response
    }

    fun responseCodeWithMessage(code: Int?, message:String): MutableMap<String, Any> {
        val response: MutableMap<String, Any> = HashMap()
        response["response"] = ResponseObject(code, message)
        return response
    }
}

