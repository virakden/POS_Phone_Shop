package com.ig.vrrest.base.storage

import com.ig.vrrest.model.response.FileUploadResponse
import com.ig.vrrest.repository.PhotoRepo
import com.ig.vrrest.repository.ProductRepo
import com.ig.vrrest.utils.FileUpload
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletRequest

@Service
class StorageServiceImpl: StorageService {
    @Autowired
    lateinit var productRepo: ProductRepo
    @Autowired
    lateinit var photoRepo: PhotoRepo

    var photoFile = "./resources/images/"

    override fun storeImageFile(filePath: String, file: MultipartFile): FileUploadResponse {
        val fileUpload = FileUpload.storeImage(file,filePath)
        return FileUploadResponse(
            file = filePath.substring(1) + "/" + fileUpload?.file,
            fileName = fileUpload?.fileName,
            filePath = filePath.substring(1) + "/",
            fileSize = fileUpload?.fileSize
        )
    }

    override fun storeImageFiles(filePath: String, file: MutableList<MultipartFile>): List<FileUploadResponse>? {
        val save = ArrayList<FileUploadResponse>()
        file.forEach {
            val fileUpload = FileUpload.storeImage(it,filePath)
            save.add(FileUploadResponse(
                file = filePath.substring(1) + "/" + fileUpload?.file,
                fileName = fileUpload?.fileName,
                filePath = filePath.substring(1) + "/",
                fileSize = fileUpload?.fileSize
            ))
        }
        return save
    }

    override fun removeFileImage(name: String, pathFile: String): Boolean? {
        return FileUpload.removeImage(name,pathFile)
    }

    override fun loadImageFile(fileName: String, fileProperty: String, httpServletRequest: HttpServletRequest
    ): ResponseEntity<*>? {
        return try {
            FileUpload.loadFileImage(fileName, fileProperty, httpServletRequest)
        } catch (ex: Exception) {
            null
        }
    }



}