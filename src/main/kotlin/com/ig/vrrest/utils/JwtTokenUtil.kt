package com.ig.vrrest.utils

import com.ig.vrrest.model.response.JwtResponse
import com.ig.vrrest.security.UserPrincipal
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils
import java.io.Serializable
import java.util.*
import java.util.function.Function
import javax.servlet.http.HttpServletRequest


@Component
class JwtTokenUtil : Serializable {

    val JWT_TOKEN_VALIDITY: Long = 30 * 24 * 60 * 60
    @Value("\${jwt.secret}")
    private val secret: String? = null

    /**
     * retrieve username from jwt token
     */
    fun getUserFromToken(token: String): String {
        return getClaimFromToken(token, Function { it.subject })
    }

    fun getJwtFromRequest(request: HttpServletRequest): String {
        val bearerToken = request.getHeader("Authorization")
        return if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            getUserFromToken(bearerToken.substring(7))
        } else getUserFromToken("")
    }


    //retrieve expiration date from jwt token
    fun getExpirationDateFromToken(token: String): Date {
        return getClaimFromToken(token, Function { it.expiration })
    }

    fun <T> getClaimFromToken(token: String, claimsResolver: Function<Claims, T>): T {
        val claims = getAllClaimsFromToken(token)
        return claimsResolver.apply(claims)
    }

    /**
     * for retrieveing any information from token we will need the secret key
     */
    private fun getAllClaimsFromToken(token: String): Claims {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).body
    }

    /**
     * check if the token has expired
     */
    private fun isTokenExpired(token: String): Boolean? {
        val expiration = getExpirationDateFromToken(token)
        return expiration.before(Date())
    }

    /**
     * while creating the token -
     * 1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
     * 2. Sign the JWT using the HS512 algorithm and secret key.
     * 3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
     * compaction of the JWT to a URL-safe string
     *
     * THIS JWT TOKEN EXPIRED 30 DAYS
     */
    private fun doGenerateToken(claims: Map<String, Any>, subject: String): JwtResponse {
        val expired = Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000)
        val token = Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(Date(System.currentTimeMillis()))
                .setExpiration(expired)
                .signWith(SignatureAlgorithm.HS512, secret).compact()
        return JwtResponse(token,expired)
    }

    /**
     * generate token for user
     */
    fun generateToken(user: UserPrincipal): JwtResponse {
        val claims = HashMap<String, Any>()
        return doGenerateToken(claims, "${user.id}|${user.username}")
    }

    /**
     * validate token
     */
    fun validateToken(token: String, user: UserPrincipal): Boolean? {
        val userCredential = getUserFromToken(token)
        return userCredential == "${user.id}|${user.username}" && (!isTokenExpired(token)!!)
    }
}
