import React, { useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import TwApi from "../services";
import TwitProfilePic from "../atoms/twitProfilePic";

const ReplyPost = ({ id, onPost }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [textPost, setTextPost] = useState("");
    const [imagePost, setImagePost] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const handleTwitPost = (event) => {
        event.preventDefault();
        const twitToPost = { content: textPost, image: imagePost };
        TwApi.reply(id, twitToPost)
            .then((_) => {
                setError("");
                navigate(`/twitt/${id}`);
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
            <div className="twitPostContainer bg-dark container-fluid mb-3">
                <TwitProfilePic {...loggedUser} />
                <div className="container">
                    <form
                        className="form-inline mx-sm-3"
                        onSubmit={handleTwitPost}
                    >
                        <div className="form-group mb-2 mt-2">
                            <input
                                className="form-control mb-2"
                                id="inputTwitText"
                                placeholder="Añadir un comentario"
                                value={textPost}
                                onChange={(event) =>
                                    setTextPost(event.target.value)
                                }
                            />
                            <input
                                className="form-control mb-2"
                                id="inputTwitImageSrc"
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
