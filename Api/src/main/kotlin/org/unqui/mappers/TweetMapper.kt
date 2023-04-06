package org.unqui.mappers

import org.unq.Tweet
import org.unq.TwitterSystem
import org.unqui.dtos.SimpleTweetDTO

class TweetMapper(var twitterSystem: TwitterSystem) {
    fun listTweetToListSimpleTweetDTO(tweets: MutableList<Tweet>) : MutableList<SimpleTweetDTO>{
        return tweets.map { e -> SimpleTweetDTO(e.id,
                                          TweetTypeDTOMapper().toTwitTypeDTO(e.type),
                                          UserMapper(twitterSystem).userToSimpleUserDTO(e.user),
                                          e.content,
                                          e.date.toString(),
                                          e.replies.size,
                                          e.reTweets.size,
                                          UserMapper(twitterSystem).listUserToListSimpleUserDTO(e.likes) ) }.toMutableList()
    }
}