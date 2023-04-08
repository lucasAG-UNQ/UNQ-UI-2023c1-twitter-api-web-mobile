package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import org.unq.TweetException
import org.unq.TwitterSystem
import org.unqui.dtos.TweetsResultDTO
import org.unqui.mappers.TweetMapper

class TweetController(var twitterSystem: TwitterSystem) {

    fun searchTweet(ctx: Context) {
        val results = twitterSystem.search( ctx.queryParam("text") as String)
        val tweetsFound =  TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
        ctx.status(200)
        ctx.json(tweetsFound)
    }

    fun getTrendingTopicks(ctx: Context) {
         val results = twitterSystem.getTrendingTopics()
         val tweetsFound = TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
         ctx.status(200)
         ctx.json(tweetsFound)
    }

    fun postTweet(ctx: Context) { ctx.result("TODO") }

    fun getTweet(ctx: Context) {
        try {
            val tweet = twitterSystem.getTweet(ctx.pathParam("id"))
            val tweetDTO =  TweetMapper(twitterSystem).tweetToTweetDTO(tweet)
            ctx.status(200)
            ctx.json(tweetDTO)
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró el Tweet")
        }
    }

    fun addLike(ctx: Context) { ctx.result("TODO") }

    fun retweet(ctx: Context) { ctx.result("TODO") }

    fun replay(ctx: Context) { ctx.result("TODO") }

}