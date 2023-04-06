package org.unqui.controlers


import org.unq.TwitterSystem
import org.unqui.dtos.TweetsResultDTO
import org.unqui.mappers.TweetMapper

class TweeterController(var twitterSystem: TwitterSystem) {
    fun getTrendingTopicks(): TweetsResultDTO{
        val results = twitterSystem.getTrendingTopics()
        return TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
    }

    fun getTweetsWithText(text: String): TweetsResultDTO{
        val results = twitterSystem.search(text)
        return TweetsResultDTO(TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(results.toMutableList()))
    }
}