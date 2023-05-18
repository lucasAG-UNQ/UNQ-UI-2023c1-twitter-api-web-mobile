import React from "react";
import './userCard.css';

const UserCard = (user) => {
  return (
    <>
    <div className="card mb-2">
    <img src={user.backgroundImage} alt="Background" className="card-img-top" />
        <div className="card-body">
        <div className="profile">
            <img src={user.image} alt="Perfil" className="rounded-lg" />
        </div>
        <h5 className="card-title">{user.username}</h5>
      

                
                <h6 className="mb-0">Seguidores</h6>
                <span>{user.followers.length}</span>

                <h6 className="mb-0">Siguiendo</h6>
                <span>{user.following.length}</span>

                <h6 className="mb-0">Twitts</h6>
                <span>{user.tweets.length}</span>
                </div></div>
    </>
  );
};

export default UserCard;
