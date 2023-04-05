package org.unqui

import io.javalin.Javalin
import org.unq.initTwitterSystem
import org.unqui.controlers.UserController

fun main() {
    val twitterSystem = initTwitterSystem()
    val user = UserController(twitterSystem).getUser(twitterSystem.users.first().id)

    val app = Javalin.create(/*config*/)
        .get("/") { ctx -> ctx.json(user) }
        .start(7070)
}