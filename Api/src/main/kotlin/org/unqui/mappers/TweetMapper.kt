package org.unqui.mappers

import org.unq.Tweet
import org.unq.TwitterSystem
import org.unqui.dtos.SimpleTweetDTO
import org.unqui.dtos.TweetDTO

class TweetMapper(var twitterSystem: TwitterSystem) {
    fun listTweetToListSimpleTweetDTO(tweets: MutableList<Tweet>) : MutableList<SimpleTweetDTO>{
        return tweets.map { e -> SimpleTweetDTO(e.id,
                                          TweetTypeDTOMapper(twitterSystem).toTwitTypeDTO(e.type),
                                          UserMapper(twitterSystem).userToSimpleUserDTO(e.user),
                                          e.content,
                                          e.date.toString(),
                                          e.replies.size,
                                          e.reTweets.size,
                                          UserMapper(twitterSystem).listUserToListSimpleUserDTO(e.likes) ) }.toMutableList()
    }
    fun tweetToSimpleTweetDTO(tweet: Tweet) : SimpleTweetDTO{
        return SimpleTweetDTO(tweet.id,
            TweetTypeDTOMapper(twitterSystem).toTwitTypeDTO(tweet.type),
            UserMapper(twitterSystem).userToSimpleUserDTO(tweet.user),
            tweet.content,
            tweet.date.toString(),
            tweet.replies.size,
            tweet.reTweets.size,
            UserMapper(twitterSystem).listUserToListSimpleUserDTO(tweet.likes) )
    }

    fun tweetToTweetDTO(tweet: Tweet): TweetDTO{
        return TweetDTO(tweet.id,
                        TweetTypeDTOMapper(twitterSystem).toTwitTypeDTO(tweet.type),
                        UserMapper(twitterSystem).userToSimpleUserDTO(tweet.user),
                        tweet.content,
                        tweet.date.toString(),
                        TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(tweet.replies),
                        TweetMapper(twitterSystem).listTweetToListSimpleTweetDTO(tweet.reTweets),
                        UserMapper(twitterSystem).listUserToListSimpleUserDTO(tweet.likes))
    }

}