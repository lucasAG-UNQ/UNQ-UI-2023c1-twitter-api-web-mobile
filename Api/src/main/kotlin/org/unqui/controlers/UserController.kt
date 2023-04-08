package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.unq.TweetException
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import org.unqui.dtos.TweetsResultDTO
import org.unqui.dtos.UserLoginDTO
import org.unqui.dtos.UsersResultDTO
import org.unqui.mappers.TweetMapper
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
        return twitterSystem.users.find { user -> user.username == userDTO.username && user.password == userDTO.password } ?: throw UserException("Invalid username or password")
    }

    fun register(ctx: Context) { ctx.result("TODO") }

    fun getUser(ctx: Context) {
        try {
            val twitterUser: User = ctx.attribute<User>("user")!!
            val userDTO =  UserMapper(twitterSystem).userToUserDTO(twitterUser)
            ctx.status(200)
            ctx.json(userDTO)
        }
        catch (e: UserException){ // creo que no es necesatio este handling
            throw BadRequestResponse("Invalid user ID")
        }
    }

    fun getFollowingTweets(ctx: Context) {
        try {
            val twitterUser: User = ctx.attribute<User>("user")!!
            val listTweet = twitterSystem.getFollowingTweets(twitterUser.id)
            val listSimplTweetDTO = TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(listTweet.toMutableList())
            val tweetReuslt = TweetsResultDTO(listSimplTweetDTO)
            ctx.status(200)
            ctx.json(tweetReuslt)
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró el Usuario")
        }
    }

    fun getUsersToFollow(ctx: Context) {
        try {
            val twitterUser: User = ctx.attribute<User>("user")!!
            val listUsers = twitterSystem.getUsersToFollow(twitterUser.id)
            val listSimplUserDTO = UserMapper(twitterSystem).listUserToListSimpleUserDTO(listUsers.toMutableList())
            val userReuslt = UsersResultDTO(listSimplUserDTO)
            ctx.status(200)
            ctx.json(userReuslt)
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró el Usuario")
        }
    }

    fun followUser(ctx: Context) { ctx.result("TODO") }
}