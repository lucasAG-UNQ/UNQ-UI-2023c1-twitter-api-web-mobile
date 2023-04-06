package org.unqui.dtos


class SimpleTweetDTO (var id: String,
                      var tipe: TwitterTypeDTO,
                      var user: SimpleUserDTO,
                      var content: String,
                      var date: String,
                      var repliesAmount: Int,
                      var reTweetAmount: Int,
                      var likes: List<SimpleUserDTO>){
}
