package org.unqui.controlers

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.*
import io.javalin.security.AccessManager
import io.javalin.security.RouteRole
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import org.unqui.TwitterApiRole
import java.lang.Exception

class JwtController(var secret: String = "unq-ui-twitter-api-secret") {
    val algorithm = Algorithm.HMAC256(secret)
    val generator = UserTokenGenerator()
    val verifier = JWT.require(algorithm).build()
    val provider = JWTProvider(algorithm, generator, verifier)

    fun generateToken(user: User): String {
        return provider.generateToken(user)
    }

    fun validate(token: String): String {
        try {
            val newToken = provider.validateToken(token)
            if (!newToken.isPresent) throw NotFoundToken()
            return newToken.get().getClaim("id").asString()
        } catch (e: Exception) {
            throw NotFoundToken()
        }
    }
}

class UserTokenGenerator() : JWTGenerator<User> {
    override fun generate(user: User, algorithm: Algorithm): String {
        val token = JWT.create().withClaim("id", user.id)
        return token.sign(algorithm)
    }
}

class TokenAccessManager(private val jwtController: JwtController, private val twitterSystem: TwitterSystem): AccessManager {

    override fun manage(handler: Handler, ctx: Context, roles: Set<RouteRole>) {
        val authToken = ctx.header("authorization")
        when {
            roles.contains(TwitterApiRole.ANYONE) -> handler.handle(ctx)
            authToken == null -> throw UnauthorizedResponse("Debe iniciar sesión para acceder a este sitio.")
            roles.contains(TwitterApiRole.USER) -> {
                val twitterUser: User = getLoggedUser(authToken)
                ctx.attribute("user", twitterUser)
                handler.handle(ctx)
            }
        }
    }

    private fun getLoggedUser(authToken: String): User {
        try {
            val userId = jwtController.validate(authToken)
            return twitterSystem.getUser(userId)
        } catch (e: NotFoundToken) {
            throw UnauthorizedResponse("Debe iniciar sesión para acceder a este sitio.")
        } catch (e: UserException) {
            throw NotFoundResponse(e.message!!)
        }
    }

}

class NotFoundToken : Exception("Not found token")