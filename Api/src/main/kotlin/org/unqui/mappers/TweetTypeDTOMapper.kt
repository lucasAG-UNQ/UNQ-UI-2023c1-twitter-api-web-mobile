package org.unqui.mappers

import org.unq.TweetType
import org.unqui.dtos.TwitterTypeDTO

class TweetTypeDTOMapper{
    fun toTwitTypeDTO(tweetType: TweetType): TwitterTypeDTO{
        var tipo = ""
        if (tweetType.isNormalTweet())
            tipo = "NormalTweet"
        else if (tweetType.isReTweet())
            tipo = "ReTweet"
        else
            tipo = "ReplayTweet"

        return TwitterTypeDTO(tipo, if (tweetType.image.isNullOrEmpty()) "" else tweetType.image!!)
    }
}