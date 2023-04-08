package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import org.unqui.dtos.DraftUserDTO
import org.unqui.dtos.UserLoginDTO
import org.unqui.mappers.UserMapper


class UserController(private val twitterSystem: TwitterSystem, private val jwtController: JwtController) {

    private val mapper: UserMapper = UserMapper(twitterSystem)

    fun login(ctx: Context) {
        val userDTO: UserLoginDTO = ctx.bodyValidator<UserLoginDTO>(UserLoginDTO::class.java).get()

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



    fun register(ctx: Context) {
        val draftUserDTO= ctx.bodyValidator<DraftUserDTO>(DraftUserDTO::class.java)
            .check({!it.username.isNullOrBlank()},"Username cannot be empty")
            .check({!it.password.isNullOrBlank()},"Password cannot be empty").get()

        val user: User
        try {
            findUserToRegister(draftUserDTO.username)
            user= twitterSystem.addNewUser(mapper.registroToDraftUser(draftUserDTO))
        }catch (e:UserException){
            throw BadRequestResponse(e.message!!)
        }
        ctx.json(mapper.userToUserDTO(user))
    }

    private fun findUserToRegister(username: String) {
        if (twitterSystem.users.any() { user -> user.username == username }) throw UserException("Username already taken")
    }

    fun getUser(ctx: Context) {
        // val user: User = twitterSystem.getUser(id)
        // return UserMapper(twitterSystem).userToUserDTO(user)
        ctx.result("TODO")
    }

    fun getFollowingTweets(ctx: Context) { ctx.result("TODO") }

    fun getUsersToFollow(ctx: Context) { ctx.result("TODO") }

    fun followUser(ctx: Context) { ctx.result("TODO") }
}