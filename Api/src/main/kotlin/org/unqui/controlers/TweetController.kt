package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import org.unq.*
import org.unqui.dtos.*
import org.unqui.mappers.TweetMapper
import org.unqui.mappers.UserMapper
import java.time.LocalDateTime.*


class TweetController(var twitterSystem: TwitterSystem) {

    private val mapper: TweetMapper = TweetMapper(twitterSystem)
    
    fun searchTweet(ctx: Context) {
        val results = twitterSystem.search( ctx.queryParam("text") as String)
        val tweetsFound =  TweetsResultDTO(mapper.listTweetToListSimpleTweetDTO(results.toMutableList()))
        ctx.status(200)
        ctx.json(tweetsFound)
    }
    fun getTrendingTopicks(ctx: Context) {
         val results = twitterSystem.getTrendingTopics()
         val tweetsFound = TweetsResultDTO(mapper.listTweetToListSimpleTweetDTO(results.toMutableList()))
         ctx.status(200)
         ctx.json(tweetsFound)
    }

    fun postTweet(ctx: Context) {
        try {
            val addTweetDTO: AddTweetDTO = ctx.bodyValidator<AddTweetDTO>(AddTweetDTO::class.java).get()
            val idUser = ctx.attribute<User>("user")!!.id
            val draftTweet = DraftTweet(idUser, addTweetDTO.content!!, addTweetDTO.image, now())
            val tweet = twitterSystem.addNewTweet(draftTweet)
            ctx.status(200)
            ctx.json(mapper.tweetToTweetDTO(tweet))
        }
        catch (e: UserException){
            throw BadRequestResponse("No se encontró e Usuario")
        }
    }
    fun getTweet(ctx: Context) {
        try {
            val tweet = twitterSystem.getTweet(ctx.pathParam("id"))
            val tweetDTO =  mapper.tweetToTweetDTO(tweet)
            ctx.status(200)
            ctx.json(tweetDTO)
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró el Tweet")
        }
    }

    fun toggleLike(ctx: Context) {
        try {
            val idUser = ctx.attribute<User>("user")!!.id
            val idTweet = ctx.pathParam("id")
            val tweet = twitterSystem.toggleLike(idTweet,  idUser)
            ctx.status(200)
            ctx.json(mapper.tweetToTweetDTO(tweet))
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró e Tweet")
        }
        catch (e: UserException){
            throw BadRequestResponse("No se encontró e Usuario")
        }
    }
    fun retweet(ctx: Context) {
        try {
            val reTweetDTO: AddReTweetDTO = ctx.bodyValidator<AddReTweetDTO>(AddReTweetDTO::class.java).get()
            val idUser = ctx.attribute<User>("user")!!.id
            val idTweet = ctx.pathParam("id")
            val draftReTweet = DraftReTweet(idUser, idTweet, reTweetDTO.content!!, now())
            val tweet = twitterSystem.addReTweet(draftReTweet)
            ctx.status(200)
            ctx.json(mapper.tweetToTweetDTO(tweet))
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró e Tweet")
        }
        catch (e: UserException){
            throw BadRequestResponse("No se encontró e Usuario")
        }
    }
    fun replay(ctx: Context) {
        try {
            val replyTweetDTO: AddReplyTweetDTO = ctx.bodyValidator<AddReplyTweetDTO>(AddReplyTweetDTO::class.java).get()
            val idUser = ctx.attribute<User>("user")!!.id
            val idTweet = ctx.pathParam("id")
            val draftReplyTweet = DraftReplyTweet(idUser, idTweet, replyTweetDTO.content!!, replyTweetDTO.image!!, now())
            val tweet = twitterSystem.replyTweet(draftReplyTweet)
            ctx.status(200)
            ctx.json(mapper.tweetToTweetDTO(tweet))
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró e Tweet")
        }
        catch (e: UserException){
            throw BadRequestResponse("No se encontró e Usuario")
        }
    }

}