import React, { useState, useEffect } from 'react';
import TwitPost from "../molecules/twitPost";
import TwitLog from '../organisms/twitLog';
import UserCard from '../molecules/userCard';

const Profile = () => {
  const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))

  const [twitts, setTwitts] = useState(loggedUser.tweets)

  if (!twitts) return <div>Loading... </div>

  return (
    <>
      <section>
        <UserCard {...loggedUser} />
      </section>
      <section>
        <TwitPost {...loggedUser} />
      </section>
      <section>
        {console.log(twitts)}
        <TwitLog twits={twitts} />
      </section>
    </>
  )
}

export default Profile