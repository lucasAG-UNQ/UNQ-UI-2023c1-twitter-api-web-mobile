import React, { useState, useEffect } from "react";
import TwApi from "../services";
import TweetProfilePic from "../atoms/tweetProfilePic";
import { useNavigate } from "react-router-dom";

const RetweetPost = ({ id, onPost }) => {
    const [loggedUser, setLoggedUser] = useState();

    const navigate = useNavigate();

    const [textPost, setTextPost] = useState("");
    const [error, setError] = useState("");

    const handleTweetPost = (event) => {
        event.preventDefault();
        const tweetToPost = { content: textPost };
        TwApi.retweet(id, tweetToPost)
            .then((response) => {
                setError("");
                const retweet = response.data.reTweet
                    .filter((retweet) => retweet.user.id === loggedUser.id)
                    .sort(
                        (ra, rb) => Date.parse(rb.date) - Date.parse(ra.date)
                    )[0];
                navigate(`/tweet/${retweet.id}`);
                onPost();
            })
            .catch((error) => {
                setError(error.status);
            });
    };

    const handleError = () => error ? <span>Ups... algo salio mal</span> : <></>;

    useEffect(() => {
        TwApi.getLoggedUser().then((response) => {
            setLoggedUser(response.data);
        });
    }, []);

    if (!loggedUser) return <div>Loading... </div>;

    return (
        <div>
            {handleError()}
            <div className="tweetPostContainer bg-dark container-fluid mb-3">
                <TweetProfilePic {...loggedUser} />
                <div className="container">
                    <form
                        className="form-inline mx-sm-3"
                        onSubmit={handleTweetPost}
                    >
                        <div className="form-group mb-2 mt-2">
                            <input
                                className="form-control mb-2"
                                id="inputTweetText"
                                placeholder="Añadir un comentario"
                                value={textPost}
                                onChange={(event) =>
                                    setTextPost(event.target.value)
                                }
                            />
                            <button type="submit" className="btn btn-primary">
                                Retweetear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RetweetPost;
