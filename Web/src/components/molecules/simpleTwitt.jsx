import TwitProfilePic from "../atoms/twitProfilePic"
import { useEffect, useState } from "react";
import TwApi from "../services";

const SimpleTwitt= ({twit})=>{
    
    const [user,setUser] = useState([])

    useEffect(()=>{ 
        TwApi.getUser(twit.user.id).then(response=>setUser(response.data))
    },[])

    const handleImage=()=>twit.tipe.image? <img className="img-fluid reduce-a-cuarto" src={twit.tipe.image} alt={"test"} />: <></>

    return(
        <div className="SimpleTwitt">
            <TwitProfilePic image={user.image} userId={twit.user.id} />
                <div className="twitContainer">
                    <div>
                        <strong> {twit.user.username} </strong>
                        <span className="date">{twit.date.replace("T", " a ")}</span>
                    </div>
                    <span className="textContainer">
                        {twit.content}
                    </span>
                    <div className="imageContainer">
                        {handleImage()}
                    </div>
                    <div className="tw-type-container">

                    </div>
            </div>
        </div>
    )
}

export default SimpleTwitt