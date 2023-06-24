import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TwApi from "../services";
import TweetProfilePic from "../atoms/tweetProfilePic";

const ReplyPost = ({ id, onPost }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [textPost, setTextPost] = useState("");
    const [imagePost, setImagePost] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const handleTweetPost = (event) => {
        event.preventDefault();
        const tweetToPost = { content: textPost, image: imagePost };
        TwApi.reply(id, tweetToPost)
            .then((_) => {
                setError("");
                navigate(`/tweet/${id}`);
                onPost();
            })
            .catch((error) => setError(error.status));
    };

    const handleError = () => error ? <span>Ups... algo salió mal</span> : <></>;

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
                            <input
                                className="form-control mb-2"
                                id="inputTweetImageSrc"
                                placeholder="Link a Imagen"
                                value={imagePost}
                                onChange={(event) =>
                                    setImagePost(event.target.value)
                                }
                            />
                            <button type="submit" className="btn btn-primary">
                                Reply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReplyPost;
