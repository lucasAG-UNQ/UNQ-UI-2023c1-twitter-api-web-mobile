package org.unqui.mappers

import org.unq.DraftUser
import org.unq.TwitterSystem
import org.unq.User
import org.unqui.dtos.FollowDTO
import org.unqui.dtos.RegistroDTO
import org.unqui.dtos.UserDTO



class UserMapper(var tweeterSystem: TwitterSystem) {
    fun userToUserDTO(user: User): UserDTO {
        return  UserDTO(user.id,
            user.username,
            user.email,
            user.image,
            user.backgroundImage,
            FollowMapper().listToListFollowDTO(user.following),
            FollowMapper().listToListFollowDTO(user.followers),
            TweetMapper(tweeterSystem).listToListTewwtDTO( tweeterSystem.tweets.filter { e -> e.user == user }.toMutableList()))
    }

    fun registroToDraftUser(registroDTO : RegistroDTO) : DraftUser {
        return  DraftUser(registroDTO.username,
            registroDTO.email,
            registroDTO.password,
            registroDTO.image,
            registroDTO.backgroundImage)
    }
    fun userToFollowDTO(user: User): FollowDTO{
        return FollowDTO(user.id, user.username)
    }

    fun listUserToListFolowDTO(users: MutableList<User>): MutableList<FollowDTO>{
        return FollowMapper().listToListFollowDTO(users)
    }
}