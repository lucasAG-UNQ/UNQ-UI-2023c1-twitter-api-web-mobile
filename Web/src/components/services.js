import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7070';

const twPost = (endpoint, data, seter, setError) => {
    axios.post(endpoint, data)
      .then( (response) => {
        //console.log(response)
        localStorage.setItem('twitterAcessToken', response.headers.authorization);
        axios.defaults.headers.common['authorization'] = response.headers.authorization;
       seter(true);
      })
      .catch(err=>{
        if (err.response) {
          console.log(Object.keys(err))
          console.log(err.response.data.title)
          setError(err.response.data.title)
        } else if (err.request){
          setError("Error de conexión")
        }
          });
      
}

const twGet = (endpoint) => {
  axios.get(endpoint)
    .then( (response) => {
      console.log(response)
    })
    .catch( (error) => {
      // console.log('Error: ' , error.response.data.message)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error: ', error.message);
      }
      console.log(error.config);
    })
}

const login = (loginData, setToken, setError) => { twPost('/login', loginData, setToken, setError)}

const logout = () => {
  localStorage.removeItem('twitterAcessToken');
  axios.defaults.headers.common['authorization'] = null;
}

const isUserLogged = () => {
  return !!localStorage.getItem('twitterAcessToken')
}

const trendingTopics = () => { twGet('/trendingTopics') }

function getUser(id){
  const res= axios(`/user/${id}`)
                .then(response => response.data)
                .catch(error => {
                    console.log(error.toJSON());
                    Promise.reject(error);
                })
  return res
}

function getTweet(id){
  const res=  axios(`/tweet/${id}`)
              .then(response => response.data)
              .catch(error => {
                  console.log(error.toJSON());
                  Promise.reject(error);
              })
  return res
}

function getFollowingTweets(){
  const res= axios("/user/followingTweets")
            .then(response => response.data)
            .catch(error => {
                    console.log(error.toJSON());
                    Promise.reject(error);
                  })
  return res
}

function postNormalTwit(data) {
  axios.post("/tweets", data)
    .catch(err=>{
        console.log(err.response.data.title)
    });
    
}

const TwApi = {
    login,
    logout,
    isUserLogged,
    trendingTopics,
    getUser,
    getTweet,
    getFollowingTweets,
    postNormalTwit
}

export default TwApi;