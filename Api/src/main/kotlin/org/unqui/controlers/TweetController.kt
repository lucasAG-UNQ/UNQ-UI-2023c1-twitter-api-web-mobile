package org.unqui.controlers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import org.unq.*
import org.unqui.dtos.AddReTweetDTO
import org.unqui.dtos.AddReplyTweetDTO
import org.unqui.dtos.TweetsResultDTO
import org.unqui.dtos.UserLoginDTO
import org.unqui.mappers.TweetMapper
import java.time.LocalDateTime.*


class TweetController(var twitterSystem: TwitterSystem) {

    fun searchTweet(ctx: Context) {
        try {
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
    fun getTweet(ctx: Context) {
        try {
            val tweet = twitterSystem.getTweet( ctx.pathParam("id") as String)
            val tweetDTO =  TweetMapper(twitterSystem).tweetToTweetDTO(tweet)
            ctx.status(200)
            ctx.json(tweetDTO)
        }
        catch (e: NotFoundToken){
            throw UnauthorizedResponse("Token not found")
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró e Tweet")
        }
    }

    fun toggleLike(ctx: Context) {
        try {
            val idUser = ctx.attribute<User>("user")!!.id
            val idTweet = ctx.pathParam("id")
            val tweet = twitterSystem.toggleLike(idTweet,  idUser)
            ctx.status(200)
            ctx.json(TweetMapper(twitterSystem).tweetToTweetDTO(tweet))
        }
        catch (e: NotFoundToken){
            throw UnauthorizedResponse("Token not found")
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
            ctx.json(TweetMapper(twitterSystem).tweetToTweetDTO(tweet))
        }
        catch (e: NotFoundToken){
            throw UnauthorizedResponse("Token not found")
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
            ctx.json(TweetMapper(twitterSystem).tweetToTweetDTO(tweet))
        }
        catch (e: NotFoundToken){
            throw UnauthorizedResponse("Token not found")
        }
        catch (e: TweetException){
            throw BadRequestResponse("No se encontró e Tweet")
        }
        catch (e: UserException){
            throw BadRequestResponse("No se encontró e Usuario")
        }
    }

}