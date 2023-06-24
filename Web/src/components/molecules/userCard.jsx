import React, { useState, useEffect } from "react";
import TwApi from "../services";
import "../../styles/molecules/userCard.css";

const UserCard = (user) => {
    const [loggedUser, setLoggedUser] = useState();
    const [isLoggedUser, setIsLoggedUser] = useState(false);
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const [error, setError] = useState('')

    const buttonFollowText = isFollowingUser ? 'Dejar de seguir' : 'Seguir';
    const buttonFollowClass = isFollowingUser ? 'btn btn-outline-danger' : 'btn btn-outline-primary';

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data);
                setIsLoggedUser(response.data.id === user.id);
                setIsFollowingUser(response.data.following.some((usr) => usr.id === user.id));
            })    
    }, []);
    
    const handleClickFollow = () => {
        TwApi.followUser(user.id)
                .then( response => {
                    setIsFollowingUser(!isFollowingUser);
                    setError('');
                })
                .catch((err) => {
                    setError(err.description) })
    };

    if (error) return (
        <>
          <h2>Ups... algo salió mal</h2>
          <p className="etiquetaRoja">{error}</p></>
        )

    if (!loggedUser) return <div>Loading... </div>;

    return (
        <>
            <div className="container mb-3 mt-3 justify-content-center">
                <div className="profile-card">
                    <img
                        src={user.backgroundImage}
                        alt="Background"
                        className="profile-background"
                    />

                    <div className="d-flex align-items-center gap-2">
                        <div className="profile-avatar">
                            <img
                                src={user.image}
                                alt="Perfil"
                                className="img-fluid rounded"
                            />
                        </div>

                        <div>
                            <h2 className="fw-bold f-27">{user.username}</h2>
                        </div>
                        <div className="d-flex justify-content-center gap-4">
                            <div>
                                <span className="d-block text-center fw-bold f-24">
                                    {user.followers.length}
                                </span>
                                <span className="d-block text-center f-18">
                                    Seguidores
                                </span>
                            </div>
                            <div>
                                <span className="d-block text-center fw-bold f-24">
                                    {user.following.length}
                                </span>
                                <span className="d-block text-center f-18">
                                    Siguiendo
                                </span>
                            </div>
                            <div>
                                <span className="d-block text-center fw-bold f-24">
                                    {user.tweets.length}
                                </span>
                                <span className="d-block text-center f-18">
                                    Tweets
                                </span>
                            </div>
                        </div>
                        <div className="follow">
                            {isLoggedUser ? null : 
                                <button className={buttonFollowClass} onClick={handleClickFollow}>
                                    {buttonFollowText}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
