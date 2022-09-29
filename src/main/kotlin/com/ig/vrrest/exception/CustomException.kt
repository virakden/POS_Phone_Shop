package com.ig.vrrest.exception

class CustomException(status: HttpCode, message: String) : RuntimeException(message) {
    var status: Int = status.value
    var error: String = status.reasonPhrase
}