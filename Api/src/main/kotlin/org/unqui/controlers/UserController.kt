package org.unqui.controlers


import org.unq.TwitterSystem
import org.unq.User
import org.unqui.dtos.UserDTO
import org.unqui.mappers.UserMapper

class UserController(var tweeterSystem: TwitterSystem) {

    fun getUser(id: String) :UserDTO{
        val user: User = tweeterSystem.getUser(id)
        return UserMapper(tweeterSystem).userToUserDTO(user)
    }
}