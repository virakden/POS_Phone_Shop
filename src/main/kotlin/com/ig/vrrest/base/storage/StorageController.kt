package com.ig.vrrest.base.storage

import com.ig.vrrest.base.response.ResponseObjectMap
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/v1/image")
@CrossOrigin
class StorageController {

    @Autowired
    lateinit var storageService: StorageService
    @Autowired
    lateinit var responseObjMap: ResponseObjectMap

    var resource = "./resources/images/"
    //    @PreAuthorize("hasAnyRole('ADMIN','USER','PURCHASE','SALE')")
    @PostMapping("/upload-image-/{type}")
    fun uploadFileImage(@PathVariable("type") type: String, file: MultipartFile): MutableMap<String, Any> {
        val path = type.replace('-', '/')
        return responseObjMap.responseObject(storageService.storeImageFile("$resource$path", file))
    }

    @PostMapping("/upload-images")
    fun uploadFileImages(@RequestPart files: MutableList<MultipartFile>): MutableMap<String, Any> {
        return responseObjMap.responseObject(storageService.storeImageFiles(resource+"type", files))
    }

    //    @PreAuthorize("hasAnyRole('ADMIN','USER','PURCHASE','SALE')")
    @GetMapping("/resources/images/{type}/{fileName:.+}")
    fun loadImage(
        @PathVariable fileName: String,
        @PathVariable type: String,
        request: HttpServletRequest
    ): ResponseEntity<*>? {
        return storageService.loadImageFile(fileName, "$resource$type", request)
    }
    //    @PreAuthorize("hasAnyRole('ADMIN','USER','PURCHASE','SALE')")
    @DeleteMapping("/delete")
    fun removeFileImage(@RequestParam name:String, @RequestParam filePath:String):MutableMap<String,Any>
    {
        return responseObjMap.responseObject(storageService.removeFileImage(name,filePath)!!)
    }
}