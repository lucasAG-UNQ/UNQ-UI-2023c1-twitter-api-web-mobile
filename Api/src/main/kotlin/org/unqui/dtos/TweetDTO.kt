package org.unqui.dtos

class TweetDTO(var id: String,
               var type: TwitterTypeDTO,
               var user: SimpleUserDTO,
               var content: String,
               var date: String,
               var replies: MutableList<SimpleTweetDTO>,
               var reTweet: MutableList<SimpleTweetDTO>,
               var likes: MutableList<SimpleUserDTO>)  {
}