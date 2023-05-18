package org.unqui.mappers

import org.unq.DraftUser
import org.unq.TwitterSystem
import org.unq.User
import org.unqui.dtos.SimpleUserDTO
import org.unqui.dtos.DraftUserDTO
import org.unqui.dtos.UserDTO



class UserMapper(var tweeterSystem: TwitterSystem) {
    fun userToUserDTO(user: User): UserDTO {
        return  UserDTO(user.id,
            user.username,
            user.email,
            user.image,
            user.backgroundImage,
            SimpleUserDTOMapper().listUserToListSimpleUserDTO(user.followers),
            SimpleUserDTOMapper().listUserToListSimpleUserDTO(user.following),
            TweetMapper(tweeterSystem).listTweetToListSimpleTweetDTO( tweeterSystem.tweets.filter { e -> e.user == user }.toMutableList()).sortedByDescending { tweet -> tweet.date }.toMutableList())
    }

    fun registroToDraftUser(registroDTO : DraftUserDTO) : DraftUser {
        return  DraftUser(registroDTO.username,
            registroDTO.email,
            registroDTO.password,
            registroDTO.image,
            registroDTO.backgroundImage)
    }
    fun userToSimpleUserDTO(user: User): SimpleUserDTO{
        return SimpleUserDTO(user.id, user.username)
    }

    fun listUserToListSimpleUserDTO(users: MutableList<User>): MutableList<SimpleUserDTO>{
        return SimpleUserDTOMapper().listUserToListSimpleUserDTO(users)
    }
}