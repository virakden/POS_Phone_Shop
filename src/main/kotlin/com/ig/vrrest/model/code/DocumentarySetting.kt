package com.ig.vrrest.model.code

import javax.persistence.*

@Entity
class DocumentarySetting (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int,
    @Column(unique = true)
    var name: String,
    var prefix: String,
    var lastcode: Int,
    var length: Int,
    var description: String,
    var status: Boolean= true
)

