import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TweetProfilePic from "../atoms/tweetProfilePic";
import TwApi from "../services";
import "../../styles/molecules/tweetPost.css";

const TweetPost = () => {
    const [loggedUser, setLoggedUser] = useState();

    const [textPost, setTextPost] = useState("");
    const [imagePost, setImagePost] = useState("");
    const [error, setError] = useState("");
    const [tweetId, setTweetId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        TwApi.getLoggedUser().then((response) => {
            setLoggedUser(response.data);
        });
    }, []);

    const validar = () => {
        let valida = true;
        if (textPost.length < 1) {
            setError("Debe ingresar un texto para el Tweet");
            return false;
        }
        if (
            imagePost.length > 0 &&
            (imagePost.length < 12 ||
                (!imagePost.toLowerCase().startsWith("http://") &&
                    !imagePost.toLowerCase().startsWith("https://")))
        ) {
            setError("La imagen debe ser una URL válida");
            return false;
        }
        return valida;
    };

    const handleTweetPost = (event) => {
        event.preventDefault();
        if (validar()) {
            const tweetToPost = { content: textPost, image: imagePost };
            TwApi.postNormalTweet(tweetToPost)
                .then((response) => {
                    setTweetId(response.data.id);
                    setError('');
                })
                .catch((error) => setError(error.description));
        }
    };

    useEffect(() => {
        if (tweetId) {
            setError("HAS GENERADO UN NUEVO TWEET");
            setTextPost("");
            setImagePost("");
            setTimeout(() => {
                navigate(`/tweet/${tweetId}`);
            }, 2000);
        }
    }, [tweetId]);

    if (!loggedUser) return <div>Loading... </div>;

    return (
        <div>
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
                                placeholder="¿Qué está pasando?"
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
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Twittear
                                </button>
                                <div className="etiquetaRoja  text-center">
                                    {error}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TweetPost;
