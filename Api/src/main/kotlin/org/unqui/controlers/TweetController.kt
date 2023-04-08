package org.unqui.controlers

import io.javalin.http.Context
import org.unq.TwitterSystem
import org.unqui.dtos.TweetsResultDTO
import org.unqui.mappers.TweetMapper

class TweetController(var twitterSystem: TwitterSystem) {

    fun searchTweet(ctx: Context) {
        // val results = twitterSystem.search(text)
        // return TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
        ctx.result("TODO") }
    fun getTrendingTopicks(ctx: Context) {
        // val results = twitterSystem.getTrendingTopics()
        // return TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
        ctx.result("TODO") }
    fun postTweet(ctx: Context) { ctx.result("TODO") }
    fun getTweet(ctx: Context) { ctx.result("TODO") }
    fun addLike(ctx: Context) { ctx.result("TODO") }
    fun retweet(ctx: Context) { ctx.result("TODO") }
    fun replay(ctx: Context) { ctx.result("TODO") }

}