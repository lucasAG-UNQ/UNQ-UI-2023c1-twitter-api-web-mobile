package org.unqui

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import org.unq.initTwitterSystem
import org.unqui.controlers.TweetController
import org.unqui.controlers.UserController

fun main() { TwitterApi(7070).start() }

class TwitterApi(private val port: Int) {

    private val twitterSystem = initTwitterSystem()
    private val userController: UserController = UserController(twitterSystem)
    private val tweetController: TweetController = TweetController(twitterSystem)

    fun start(): Javalin {
        val app = Javalin.create { config ->
            config.http.defaultContentType = "application/json"
        }
        app.start(port)
        app.get("/") { ctx -> ctx.result("Twitter API") }
        registerAuthRoutes(app)
        registerUserRoutes(app)
        registerTweetRoutes(app)
        return app
    }

    private fun registerAuthRoutes(app: Javalin) {
        app.post("login", userController::login)
        app.post("register", userController::register)
    }

    private fun registerUserRoutes(app: Javalin) {
        //val salida = UserController(twitterSystem).getUser(twitterSystem.users.first().id)

        app.routes {
            path("user") {
                get(userController::getUser)
                path("followingTweets") { get(userController::getFollowingTweets) }
                path("usersToFollow") { get(userController::getUsersToFollow) }
                path(":id") {
                    get(userController::getUser)
                    path("follow") { put(userController::followUser) }
                }
            }
        }
    }

    private fun registerTweetRoutes(app: Javalin) {
        //val salida = TweeterController(twitterSystem).getTrendingTopicks()
        //val salida = TweeterController(twitterSystem).getTweetsWithText("dancer")
        app.get("search", tweetController::searchTweet)
        app.get("trendingTopics", tweetController::getTrendingTopicks)
        app.routes {
            path("tweet") {
                post(tweetController::postTweet)
                path(":id") {
                    get(tweetController::getTweet)
                    path("like") { put(tweetController::addLike) }
                    path("retweet") { post(tweetController::retweet) }
                    path("replay") { post(tweetController::replay) }
                }
            }
        }

    }
}
