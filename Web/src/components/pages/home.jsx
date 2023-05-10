import Sidebar from "../molecules/sidebar";
import Twit from "../molecules/twit";
import TwitPost from "../molecules/twitPost";
import "./home.css"

const Home = () => {
  const userTest={id: "123456",
     username: "pepito123",
     email: "pepito123@a.com",
     image: "https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff",
     backgroundImage: "https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff",
     followers: [],
     following: [],
     tweets: []}
  const simpleUserTest={id:"123456",username:"pepito123"}
  const twitTypeTest={tweet:null, image:"https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff"}
  const simpleTwitTest={id:"12345645", twitType:{twitTypeTest},user:simpleUserTest, content: "test test testtest test testtest test testtest test testtest test test",
                        date:"3 mayo", repliesAmount:3,reTweetAmount:4,likes:[simpleUserTest]}
  return (
    <>
      <TwitPost {...userTest} />
      <Twit user={userTest.image} twit={...twitTest} />
    </>
  )
}

export default Home