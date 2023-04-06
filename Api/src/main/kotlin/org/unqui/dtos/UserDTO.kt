package org.unqui.dtos

class UserDTO (var id: String,
               var username: String,
               var email: String,
               var image: String,
               var backgroundImage: String,
               var followers: MutableList<SimpleUserDTO>,
               var following: MutableList<SimpleUserDTO>,
               var tweets: MutableList<SimpleTweetDTO>){
}
