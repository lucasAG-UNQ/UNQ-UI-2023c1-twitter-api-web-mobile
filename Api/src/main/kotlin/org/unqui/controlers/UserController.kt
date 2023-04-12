package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.UnauthorizedResponse
import org.unq.TweetException
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import org.unqui.dtos.DraftUserDTO
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

    private fun findUserToLogin(userLoginDTO: UserLoginDTO): User {
        return twitterSystem.users.find { user -> user.username == userLoginDTO.username && user.password == userLoginDTO.password} ?: throw UserException("Invalid username or password")
    }

    fun register(ctx: Context) {
        val draftUserDTO= ctx.bodyValidator<DraftUserDTO>(DraftUserDTO::class.java)
            .check({ !it.username.isNullOrBlank() },"Username cannot be empty")
            .check({ it.email!!.matches(Regex("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}\$")) },"Provide a valid email")
            .check({ !it.password.isNullOrBlank() },"Password cannot be empty").get()

        val user: User
        try {
            user= twitterSystem.addNewUser(mapper.registroToDraftUser(draftUserDTO))
        }catch (e:UserException){
            throw BadRequestResponse(e.message!!)
        }
        ctx.json(mapper.userToUserDTO(user))
    }

    fun getUser(ctx: Context) {
        val twitterUser: User = ctx.attribute<User>("user")!!
        ctx.status(200)
        ctx.json(mapper.userToUserDTO(twitterUser))
    }

    fun getUserByID(ctx: Context){
        try {
            val twitterUser: User = twitterSystem.getUser(ctx.pathParam("id"))
            ctx.status(200)
            ctx.json(mapper.userToUserDTO(twitterUser))
        }
        catch (e: UserException){
            throw NotFoundResponse("No se encontró el Usuario")
        }
    }

    fun getFollowingTweets(ctx: Context) {
        try {
            val twitterUser: User = ctx.attribute<User>("user")!!
            val listTweet = twitterSystem.getFollowingTweets(twitterUser.id)
            val listSimplTweetDTO = TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(listTweet.toMutableList())
            ctx.status(200)
            ctx.json(TweetsResultDTO(listSimplTweetDTO))
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró el Usuario")
        }
    }

    fun getUsersToFollow(ctx: Context) {
        try {
            val twitterUser: User = ctx.attribute<User>("user")!!
            val listUsers = twitterSystem.getUsersToFollow(twitterUser.id)
            val listSimplUserDTO = mapper.listUserToListSimpleUserDTO(listUsers.toMutableList())
            ctx.status(200)
            ctx.json(UsersResultDTO(listSimplUserDTO))
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró el Usuario")
        }
    }

    fun followUser(ctx: Context) {
        val userToFollowID = ctx.pathParam("id")
        val logedUser = ctx.attribute<User>("user")!!.id
        try {
            val res: User = twitterSystem.toggleFollow(userToFollowID,logedUser)
            ctx.json(mapper.userToUserDTO(res))
        } catch (e:UserException){
            throw NotFoundResponse(e.message!!)
        }
    }
}