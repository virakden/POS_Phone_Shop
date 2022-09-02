package com.ig.vrrest.utils

import com.ig.vrrest.excception.CustomException
import com.ig.vrrest.excception.HttpCode
import com.ig.vrrest.model.response.FileUploadResponse
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.IOException
import java.net.MalformedURLException
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.text.SimpleDateFormat
import java.util.Date
import java.util.UUID
import javax.servlet.http.HttpServletRequest

class FileUpload {
    /**
     * Can call class to using anywhere like singleton
     */
    companion object {

        fun storeImage(file: MultipartFile, filePath: String): String {
            val path = Paths.get(filePath).toAbsolutePath().normalize()
            val directory = File(path.toString())
            if (!directory.exists()) {
                directory.mkdirs()
            }

//            to connect path name with file name (random new file name) with date of upload image
            val extension = file.originalFilename.toString()
            val sub = extension.substring(extension.lastIndexOf("."))
            val formatter = SimpleDateFormat("yyyy-MM-dd-HHmmss")
            val nameFile = UUID.randomUUID().toString().plus(formatter.format(Date()).toString()).plus(sub)

            try {
                Files.copy(file.inputStream, path.resolve(nameFile), StandardCopyOption.REPLACE_EXISTING)
            } catch (e: IOException) {
                return null.toString()
            }
            return nameFile
        }

        fun getFile(
            fileName: String,
            fileProperty: String,
            request: HttpServletRequest,
            download: Boolean
        ): ResponseEntity<Resource> {
            try {
                val path = Paths.get(fileProperty).toAbsolutePath().normalize()
                val filePath = path.resolve(fileName).normalize()

                val resource = UrlResource(filePath.toUri())
                resource.contentLength()

                if (download) {
                    val contentType = request.servletContext.getMimeType(resource.file.absolutePath)
                        ?: "application/octet-stream"
                    return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.filename + "\"")
                        .body(resource)
                }

                val contentType = request.servletContext.getMimeType(resource.file.absolutePath)
                    ?: throw CustomException(HttpCode.NOT_ACCEPTABLE, "Invalid file type.")
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource)
            } catch (e: MalformedURLException) {
                throw CustomException(HttpCode.BAD_REQUEST, e.message!!)
            } catch (e: IOException) {
                throw CustomException(HttpCode.NOT_FOUND, "File not found.")
            }
        }

        fun storeFileImage(pathFile: String, file: MultipartFile): FileUploadResponse? {
            val fileStorage = storeImage(file, pathFile)
            return FileUploadResponse("${pathFile.substring(1)}${fileStorage}", fileStorage)
        }
    }

    fun storeImage(file:MultipartFile,filePath:String, fileName: String): String {
        val path = Paths.get(filePath).toAbsolutePath().normalize()
        val directory = File(path.toString())
        if (!directory.exists()) {
            directory.mkdirs()
        }

        try {
            Files.copy(file.inputStream, path.resolve(fileName), StandardCopyOption.REPLACE_EXISTING)
        } catch (e: IOException) {
            return null.toString()
        }
        return fileName
    }


}