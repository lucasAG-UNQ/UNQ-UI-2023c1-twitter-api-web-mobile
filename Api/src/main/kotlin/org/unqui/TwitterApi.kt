package org.unqui

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.security.RouteRole
import org.unq.initTwitterSystem
import org.unqui.controlers.JwtController
import org.unqui.controlers.TokenAccessManager
import org.unqui.controlers.TweetController
import org.unqui.controlers.UserController

fun main() { TwitterApi(7070).start() }

class TwitterApi(private val port: Int) {

    private val twitterSystem = initTwitterSystem()
    private val jwtController = JwtController()
    private val userController: UserController = UserController(twitterSystem, jwtController)
    private val tweetController: TweetController = TweetController(twitterSystem)

    fun start(): Javalin {
        val app = Javalin.create { config ->
            config.http.defaultContentType = "application/json"

            config.plugins.enableCors { cors ->
                cors.add { it ->
                    it.anyHost()
                    it.allowCredentials = true
                    it.exposeHeader("*")} }

            config.accessManager(TokenAccessManager(jwtController, twitterSystem))
        }
        app.get("/", { ctx -> ctx.result("Twitter API") } , TwitterApiRole.ANYONE)
        registerAuthRoutes(app)
        registerUserRoutes(app)
        registerTweetRoutes(app)
        app.start(port)
        return app
    }

    private fun registerAuthRoutes(app: Javalin) {
        app.post("/login", userController::login, TwitterApiRole.ANYONE)
        app.post("/register", userController::register, TwitterApiRole.ANYONE)
    }

    private fun registerUserRoutes(app: Javalin) {
        app.routes {
            path("user") {
                get(userController::getUser, TwitterApiRole.USER)
                path("followingTweets") { get(userController::getFollowingTweets, TwitterApiRole.USER) }
                path("usersToFollow") { get(userController::getUsersToFollow, TwitterApiRole.USER) }
                path("{id}") {
                    get(userController::getUserByID, TwitterApiRole.USER)
                    path("follow") { put(userController::followUser, TwitterApiRole.USER) }
                }
            }
        }
    }

    private fun registerTweetRoutes(app: Javalin) {
        app.get("search", tweetController::searchTweet, TwitterApiRole.USER)
        app.get("trendingTopics", tweetController::getTrendingTopicks, TwitterApiRole.USER)
        app.routes {
            path("tweet") {
                post(tweetController::postTweet, TwitterApiRole.USER)
                path("{id}") {
                    get(tweetController::getTweet, TwitterApiRole.USER)
                    path("like") { put(tweetController::toggleLike, TwitterApiRole.USER) }
                    path("retweet") { post(tweetController::retweet, TwitterApiRole.USER) }
                    path("replay") { post(tweetController::replay, TwitterApiRole.USER) }
                }
            }
        }

    }
}

enum class TwitterApiRole: RouteRole {
    ANYONE, USER
}