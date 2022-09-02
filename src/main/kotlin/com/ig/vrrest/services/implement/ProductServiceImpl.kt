package com.ig.vrrest.services.implement

import com.ig.vrrest.base.response.ResponseObject
import com.ig.vrrest.model.product.Photo
import com.ig.vrrest.model.product.Product
import com.ig.vrrest.model.request.ImageRequest
import com.ig.vrrest.repository.PhotoRepo
import com.ig.vrrest.repository.ProductRepo
import com.ig.vrrest.services.ProductService
import com.ig.vrrest.utils.FileUpload
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartHttpServletRequest
import javax.persistence.criteria.Predicate
import javax.servlet.http.HttpServletRequest

@Service
class ProductServiceImpl : ProductService {

    @Autowired
    lateinit var productRepo: ProductRepo

    @Autowired
    lateinit var photoRepo: PhotoRepo

    override fun addNew(t: Product): Product = productRepo.save(t)

    override fun addMore(t: List<Product>): List<Product>? {
        return productRepo.saveAll(t)
    }

    override fun findById(id: Long): Product? {
        return productRepo.findByIdAndStatusTrue(id)
    }

    override fun findAll(): List<Product>? {
        return productRepo.findAllByStatusTrue()
    }

    override fun findAllList(q: String?, page: Int, size: Int): Page<Product>? {
        return productRepo.findAll({ root, _, cb ->
            val predicates = ArrayList<Predicate>()
            if (q != null) {
                val productName = cb.like(cb.upper(root.get("productName")), "%${q.toUpperCase()}%")
                val productPrice = cb.like(cb.upper(root.get("productPrice")), "%${q.toUpperCase()}%")
                predicates.add(cb.or(productName, productPrice))
            }
            predicates.add(cb.isTrue((root.get("status"))))
            cb.and(*predicates.toTypedArray())
        }, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id")))
    }


    override fun updateObj(id: Long, t: Product): Product? {
        val oldProduct = findById(t.id!!)
        oldProduct?.productName = t.productName
        oldProduct?.productCost = t.productCost
        oldProduct?.productPrice = t.productPrice
        oldProduct?.description = t.description
        oldProduct?.stockAlert = t.stockAlert

        return productRepo.save(oldProduct!!)
    }

    @Value("./image/product")
    val photoFile: String? = null


    override fun uploadImage(
        id: Long,
        image: MutableList<ImageRequest>
    ): ResponseObject? {
        val product = productRepo.findByIdAndStatusTrue(id)
        image.forEach {
            val photo = Photo()
            val fileUpload= FileUpload.storeImage(it.image!!, photoFile!!)
            photo.photoName = fileUpload
            photo.product = product
            photoRepo.save(photo)
        }
        return ResponseObject(200, "Upload Successful!!!")
    }


    override fun getImageById(fileName: String,  request: HttpServletRequest): ResponseEntity<*>? {
        return try {
            FileUpload.getFile(fileName, photoFile!!, request, true)
        } catch (ex: Exception) {
            null
        }
    }

    override fun uploadImage(
        id: Long,
        amountImage: Int,
        image: MultipartHttpServletRequest
    ): ResponseObject? {
        val product = productRepo.findByIdAndStatusTrue(id)
        repeat(amountImage) {
            val gallery = Photo()
            val file = image.getFile("image$it")
            val upload = FileUpload.storeFileImage(photoFile!!, file!!)
            gallery.photoName = upload?.imageName
            gallery.product = product
            photoRepo.save(gallery)
        }
        return ResponseObject(200, "Upload Successful!!!")
    }

}