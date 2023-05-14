import TwitProfilePic from "../atoms/twitProfilePic"
import "./twitPost.css"
import TwApi from "../services"
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const TwitPost= (usuario)=>{
    const [textPost, setTextPost] = useState("")
    const [imagePost, setImagePost]= useState("")

    const handleTwitPost = (event) => {
        event.preventDefault()
        const twitToPost= {"content":textPost, "image":imagePost}
        TwApi.postNormalTwit(twitToPost)
    }

    return(
        <div className="twitPostContainer">
            <TwitProfilePic {...usuario}/>
            <div className="container">
                <form className="form-inline mx-sm-3" onSubmit={handleTwitPost}>
                    <div className="form-group mb-2 mt-2">
                        <input 
                            className="form-control mb-2" 
                            id="inputTwitText" 
                            placeholder="¿Qué está pasando?"
                            value={textPost}
                            onChange={(event) => setTextPost(event.target.value)}
                        />
                        <input 
                            className="form-control mb-2" 
                            id="inputTwitImageSrc" 
                            placeholder="Link a Imagen"
                            value={imagePost}
                            onChange={(event) => setImagePost(event.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Twittear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TwitPost