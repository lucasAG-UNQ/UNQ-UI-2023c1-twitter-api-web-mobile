package org.unqui.mappers

import org.unq.User
import org.unqui.dtos.SimpleUserDTO

class SimpleUserDTOMapper {
    fun listUserToListSimpleUserDTO(users: MutableList<User>) :MutableList<SimpleUserDTO>{
        return users.map { e -> SimpleUserDTO(e.id, e.username) }.toMutableList()
    }
}