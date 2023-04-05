package org.unqui.dtos


class TweetDTO (var id: String,
                var tipe: TweetTypeDTO,
                var user: FollowDTO,
                var content: String,
                var date: String,
                var repliesAmount: Int,
                var reTweetAmount: Int,
                var likes: List<FollowDTO>){
}
