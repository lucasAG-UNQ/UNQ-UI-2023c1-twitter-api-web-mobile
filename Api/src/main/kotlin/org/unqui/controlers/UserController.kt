package org.unqui.controlers

import io.javalin.http.Context
import org.unq.TwitterSystem
import org.unq.User
import org.unqui.dtos.UserDTO
import org.unqui.mappers.UserMapper


class UserController(var twitterSystem: TwitterSystem) {

    fun login(ctx: Context) { ctx.result("TODO") }

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