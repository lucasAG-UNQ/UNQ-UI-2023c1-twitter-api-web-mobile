import React, { useState, useEffect } from "react";
import TwitPost from "../molecules/twitPost";
import TwitLog from "../organisms/twitLog";
import UserCard from "../molecules/userCard";
import TwApi from "../services";

const Profile = () => {
    const [loggedUser, setLoggedUser] = useState();
    const [twitts, setTwitts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data);
                setTwitts(response.data.tweets);
            })
            .catch((err) => {
                setError(err.description);
            });
    }, []);

    if (error)
        return (
            <>
                <h2>Ups... algo salió mal</h2>
                <p className="etiquetaRoja">{error}</p>
            </>
        );
    if (!twitts || !loggedUser) return <div>Loading... </div>;

    return (
        <div className="vh-100 overflow-auto">
            <section>
                <UserCard {...loggedUser} />
            </section>
            <section>
                <TwitPost {...loggedUser} />
            </section>
            <section>
                <TwitLog twits={twitts} />
            </section>
        </div>
    );
};

export default Profile;
