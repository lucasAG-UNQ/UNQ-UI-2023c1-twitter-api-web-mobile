import "./fullTwittWithActions.css"
import SimpleTwitt from "./simpleTwitt";
import TwittActions from "./twittActions";

const FullTwittWithActions= ({twit})=>{



    return(<>
        <article className="FullTwittWithActions bg-dark container-fluid mb-3">
            <SimpleTwitt twit={twit} />
            <TwittActions twit={twit} />
        </article>
        </>
    )
}

export default FullTwittWithActions