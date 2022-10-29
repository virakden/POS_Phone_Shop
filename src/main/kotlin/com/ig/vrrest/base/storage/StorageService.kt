package com.ig.vrrest.base.storage
import com.ig.vrrest.model.response.FileUploadResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletRequest

interface StorageService {
    fun storeImageFile(filePath:String,file: MultipartFile): FileUploadResponse
    fun storeImageFiles(filePath:String,file: MutableList<MultipartFile>): List<FileUploadResponse>?
    fun loadImageFile(fileName: String,fileProperty: String,httpServletRequest: HttpServletRequest): ResponseEntity<*>?
    fun removeFileImage(name: String, pathFile: String): Boolean?

}