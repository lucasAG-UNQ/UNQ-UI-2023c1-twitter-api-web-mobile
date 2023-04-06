package org.unqui

import io.javalin.Javalin
import org.unq.initTwitterSystem
import org.unqui.controlers.TweeterController
import org.unqui.controlers.UserController

fun main() {
    val twitterSystem = initTwitterSystem()
    //  ######################################################
    //  para probar dejar descomentada la línea
    // de la funcionalidad que de va a probar
    // #######################################################

    //val salida = UserController(twitterSystem).getUser(twitterSystem.users.first().id)
    //val salida = TweeterController(twitterSystem).getTrendingTopicks()
    val salida = TweeterController(twitterSystem).getTweetsWithText("dancer")

    val app = Javalin.create(/*config*/)
        .get("/") { ctx -> ctx.json(salida) }
        .start(7070)
}