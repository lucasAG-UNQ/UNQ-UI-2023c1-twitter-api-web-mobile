package org.unqui.mappers

import org.unq.TweetType
import org.unq.TwitterSystem
import org.unqui.dtos.SimpleTweetDTO
import org.unqui.dtos.TwitterTypeDTO

class TweetTypeDTOMapper(var twitterSystem: TwitterSystem){
    fun toTwitTypeDTO(tweetType: TweetType): TwitterTypeDTO{
        var simplTweetDTO: SimpleTweetDTO? = null
        var image: String? = null

        if (tweetType.tweet != null) {
            simplTweetDTO = TweetMapper(twitterSystem).tweetToSimpleTweetDTO(tweetType.tweet!!)
        }
        if (tweetType.image != null) {
            image = tweetType.image!!
        }

        return TwitterTypeDTO(simplTweetDTO, image)
    }
}