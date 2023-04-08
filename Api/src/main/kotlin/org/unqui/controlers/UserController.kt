package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import org.unqui.dtos.UserLoginDTO
import org.unqui.mappers.UserMapper


class UserController(private val twitterSystem: TwitterSystem, private val jwtController: JwtController) {

    private val mapper: UserMapper = UserMapper(twitterSystem)

    fun login(ctx: Context) {
        val userDTO: UserLoginDTO = ctx.bodyValidator<UserLoginDTO>().get()

        try {
            val twitterUser: User = findUserToLogin(userDTO)
            val userToken = jwtController.generateToken(twitterUser)

            ctx.header("Authorization", userToken)
            ctx.json(mapper.userToUserDTO(twitterUser))
        } catch (e: UserException) {
            throw BadRequestResponse(e.message!!)
        }
    }

    private fun findUserToLogin(userDTO: UserLoginDTO): User {
        return twitterSystem.users.find { user -> user.username == userDTO.username } ?: throw UserException("Invalid username or password")
    }

    fun register(ctx: Context) { ctx.result("TODO") }

    fun getUser(ctx: Context) {
        // val user: User = twitterSystem.getUser(id)
        // return UserMapper(twitterSystem).userToUserDTO(user)
        ctx.result("TODO")
    }

    fun getFollowingTweets(ctx: Context) { ctx.result("TODO") }

    fun getUsersToFollow(ctx: Context) { ctx.result("TODO") }

    fun followUser(ctx: Context) { ctx.result("TODO") }
}