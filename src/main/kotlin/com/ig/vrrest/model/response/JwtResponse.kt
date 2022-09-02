package com.ig.vrrest.model.response

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*

class JwtResponse (
        var token: String,
        @JsonFormat(timezone = "GMT+7", pattern = "yyyy/MM/dd")
        var expireIn: Date
)
