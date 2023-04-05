package org.unqui.mappers

import org.unq.TweetType
import org.unqui.dtos.TweetTypeDTO

class TweetTypeDTOMapper{
    fun toTwitTypeDTO(tweetType: TweetType): TweetTypeDTO{
        var tipo = ""
        if (tweetType.isNormalTweet())
            tipo = "NormalTweet"
        else if (tweetType.isReTweet())
            tipo = "ReTweet"
        else
            tipo = "ReplayTweet"

        return TweetTypeDTO(tipo, if (tweetType.image.isNullOrEmpty()) "" else tweetType.image!!)
    }
}