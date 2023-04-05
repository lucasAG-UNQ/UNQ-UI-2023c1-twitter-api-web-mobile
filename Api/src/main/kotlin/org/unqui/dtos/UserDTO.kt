package org.unqui.dtos

class UserDTO (var id: String,
               var username: String,
               var email: String,
               var image: String,
               var backgroundImage: String,
               var followers: MutableList<FollowDTO>,
               var following: MutableList<FollowDTO>,
               var tweets: MutableList<TweetDTO>){
}
