import TwApi from "../services"
import { useState } from "react"
import TwitProfilePic from "../atoms/twitProfilePic"
import { useNavigate } from "react-router-dom"

const RetweetPost= ({id})=>{
    const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))
    const navigate = useNavigate()

    const [textPost, setTextPost] = useState("")
    const [error, setError]= useState("")

    const handleTwitPost = (event) => {
        event.preventDefault()
        const twitToPost= {"content":textPost}
        TwApi.retwitt(id,twitToPost)
                .then(response=>{setError("")
                        const retwit= (response.data.reTweet.filter(retwit=>retwit.user.id==loggedUser.id)
                                                            .sort((ra,rb)=>Date.parse(rb.date)-Date.parse(ra.date)))[0]
                        navigate(`/twitt/${retwit.id}`)
                })
                .catch(error=>{setError(error.status)})
    }

    const handleError= ()=> error? <span>Ups... algo salio mal</span>:<></> 


    return(
        <div>
            {handleError()}
            <div className="twitPostContainer bg-dark container-fluid mb-3">
                <TwitProfilePic {...loggedUser}/>
                <div className="container">
                    <form className="form-inline mx-sm-3" onSubmit={handleTwitPost}>
                        <div className="form-group mb-2 mt-2">
                            <input 
                                className="form-control mb-2" 
                                id="inputTwitText" 
                                placeholder="Añadir un comentario"
                                value={textPost}
                                onChange={(event) => setTextPost(event.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">ReTwittear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RetweetPost