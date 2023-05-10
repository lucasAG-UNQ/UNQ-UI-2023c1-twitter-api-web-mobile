import React from "react"
import { Link } from "react-router-dom"

const TwitProfilePic= (user)=>{
    return(
        <Link to={"/user/"+user.username}>
            <img height={48} className={"rounded-circle"} src={user.image} alt={"profile_pic"}/>
        </Link>
    )
}

export default TwitProfilePic