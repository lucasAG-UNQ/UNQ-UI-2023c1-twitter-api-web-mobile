package org.unqui.mappers

import org.unq.User
import org.unqui.dtos.FollowDTO

class FollowMapper {
    fun listToListFollowDTO(followers: MutableList<User>) :MutableList<FollowDTO>{
        return followers.map { e -> FollowDTO(e.id, e.username) }.toMutableList()
    }
}