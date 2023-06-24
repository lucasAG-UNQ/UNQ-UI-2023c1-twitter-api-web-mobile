import React, { useState, useEffect } from "react";
import TweetPost from "../molecules/tweetPost";
import TweetLog from "../organisms/tweetLog";
import UserCard from "../molecules/userCard";
import TwApi from "../services";

const Profile = () => {
    const [loggedUser, setLoggedUser] = useState();
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setError('');
                setLoggedUser(response.data);
                setTweets(response.data.tweets);
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
    if (!tweets || !loggedUser) return <div>Loading... </div>;

    return (
        <div className="vh-100 overflow-auto">
            <section>
                <UserCard {...loggedUser} />
            </section>
            <section>
                <TweetPost {...loggedUser} />
            </section>
            <section>
                <TweetLog tweets={tweets} />
            </section>
        </div>
    );
};

export default Profile;
