package com.ig.vrrest.services.implement

import com.ig.vrrest.repository.DocumentarySettingRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DocumentarySettingImpl {
    @Autowired
    lateinit var documentarySettingRepo: DocumentarySettingRepo

    //get recordby code type (emp, prodcut,...)
    //lastCode +1
    //retrun lastCode + fprmat (prifix+lastCode+subfix)
    //return type string
    fun getNextCode(): String {
//        return "PRD 01000"
        var document = documentarySettingRepo.findByNameAndStatusTrue("invoice")
        document!!.lastcode += 1
        documentarySettingRepo.save(document!!)
        var code = document.prefix + document.lastcode;
        return code;
    }

}