import React from "react"
import { Link } from "react-router-dom"

const TweetProfilePic= ({image, id})=>{
    return(
        <div>
            <Link to={`/user/${id}`}>
                <img height={48} className={"rounded-circle"} src={image} alt={"ProfilePic"}/>
            </Link>
        </div>
    )
}

export default TweetProfilePic