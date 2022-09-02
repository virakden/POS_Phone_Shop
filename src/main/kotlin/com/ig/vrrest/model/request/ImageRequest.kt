package com.ig.vrrest.model.request

import org.springframework.web.multipart.MultipartFile

class ImageRequest (
    var image: MultipartFile? = null
)