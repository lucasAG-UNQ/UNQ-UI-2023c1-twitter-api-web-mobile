package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import org.unqui.dtos.TweetsResultDTO
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

    fun register(ctx: Context) { ctx.result("TODO") }

    fun getUser(ctx: Context) {
        try {
            val twitterUser: User = twitterSystem.getUser(ctx.pathParam("id"))
            val userDTO =  UserMapper(twitterSystem).userToUserDTO(twitterUser)
            ctx.status(200)
            ctx.json(userDTO)
        }
        catch (e: UserException){
            throw BadRequestResponse("Invalid user ID")
        }
    }

    fun getFollowingTweets(ctx: Context) {
        try {
            val token = ctx.header("Authorization")
            val id = JwtController().validate(token as String)
            val listTweet = twitterSystem.getFollowingTweets(id)
            val listSimplTweetDTO = TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(listTweet.toMutableList())
            val tweetReuslt = TweetsResultDTO(listSimplTweetDTO)
            ctx.status(200)
            ctx.json(tweetReuslt)
        }
        catch (e: NotFoundToken){
            throw UnauthorizedResponse("Token not found")
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró el Usuario")
        }
    }

    fun getUsersToFollow(ctx: Context) { try {
        val token = ctx.header("Authorization")
        val id = JwtController().validate(token as String)
        val listUsers = twitterSystem.getUsersToFollow(id)
        val listSimplUserDTO = UserMapper(twitterSystem).listUserToListSimpleUserDTO(listUsers.toMutableList())
        val userReuslt = UsersResultDTO(listSimplUserDTO)
        ctx.status(200)
        ctx.json(userReuslt)
    }
    catch (e: NotFoundToken){
        throw UnauthorizedResponse("Token not found")
    }
    catch (e: TweetException){
        throw BadRequestResponse("No se encontró el Usuario")
    } }

    fun followUser(ctx: Context) { ctx.result("TODO") }
}