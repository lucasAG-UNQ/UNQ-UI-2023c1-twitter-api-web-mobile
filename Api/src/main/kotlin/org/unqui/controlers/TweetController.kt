package org.unqui.controlers

import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import org.unq.TwitterSystem
import org.unqui.dtos.TweetsResultDTO
import org.unqui.mappers.TweetMapper

class TweetController(var twitterSystem: TwitterSystem) {

    fun searchTweet(ctx: Context) {
        try {
            val token = ctx.header("Authorization")
            JwtController().validate(token as String)
            val results = twitterSystem.search( ctx.queryParam("text") as String)
            val tweetsFound =  TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
            ctx.status(200)
            ctx.json(tweetsFound)
        }
        catch (e: NotFoundToken){
            throw UnauthorizedResponse("Token not found")
        }
    }
    fun getTrendingTopicks(ctx: Context) {
         try {
             val token = ctx.header("Authorization")
             JwtController().validate(token as String)
             val results = twitterSystem.getTrendingTopics()
             val tweetsFound = TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
             ctx.status(200)
             ctx.json(tweetsFound)
        }
        catch (e: NotFoundToken){
            throw UnauthorizedResponse("Token not found")
        }
    }

    fun postTweet(ctx: Context) { ctx.result("TODO") }
    fun getTweet(ctx: Context) { ctx.result("TODO") }
    fun addLike(ctx: Context) { ctx.result("TODO") }
    fun retweet(ctx: Context) { ctx.result("TODO") }
    fun replay(ctx: Context) { ctx.result("TODO") }

}