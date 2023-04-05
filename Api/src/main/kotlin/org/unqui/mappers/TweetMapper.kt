package org.unqui.mappers

import org.unq.Tweet
import org.unq.TwitterSystem
import org.unqui.dtos.TweetDTO
import org.unqui.dtos.TweetTypeDTO

class TweetMapper(var twitterSystem: TwitterSystem) {
    fun listToListTewwtDTO(tweets: MutableList<Tweet>) : MutableList<TweetDTO>{
        return tweets.map { e -> TweetDTO(e.id,
                                          TweetTypeDTOMapper().toTwitTypeDTO(e.type),
                                          UserMapper(twitterSystem).userToFollowDTO(e.user),
                                          e.content,
                                          e.date.toString(),
                                          e.replies.size,
                                          e.reTweets.size,
                                          UserMapper(twitterSystem).listUserToListFolowDTO(e.likes) ) }.toMutableList()
    }
}