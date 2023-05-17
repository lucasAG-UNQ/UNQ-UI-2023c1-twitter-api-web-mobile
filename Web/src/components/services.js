import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7070';
//axios.defaults.baseURL = 'http://192.168.0.192:7070';

const twPost = (endpoint, data) => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('twitterAcessToken');
  return axios.post(endpoint, data)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

const twGet = (endpoint) => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('twitterAcessToken');
  return axios.get(endpoint)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

// TODO: el put no lleva data?
const twPut = (endpoint)=>{
  axios.defaults.headers.common['authorization'] = localStorage.getItem('twitterAcessToken');
  return axios.put(endpoint)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("RESPONSE_ERROR")
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return Promise.reject(error.response);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log("REQUEST_ERROR")
    console.log(error.request);
    return Promise.reject(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("UNEXPECTED_ERROR")
    console.log(error.message);
    return Promise.reject(error);
  }
  // console.log(error.config);
}


const login = (loginData) => twPost('/login', loginData);

const register = (regData) => twPost('/register', regData);

const logout = () => {
  localStorage.removeItem('twitterAcessToken');
  localStorage.removeItem('twitterLoggedUser');
  axios.defaults.headers.common['authorization'] = null;
}

const isUserLogged = () => !!localStorage.getItem('twitterAcessToken');

const trendingTopics = () => twGet('/trendingTopics')

const getUser = (id) => twGet(`/user/${id}`);

const getTweet = (id) => twGet(`/tweet/${id}`);

const search = (text) => twGet(`/search/?text=${text}`);

const getFollowingTweets = () => twGet("/user/followingTweets");

const postNormalTwit = (data) => twPost("/tweets", data);

const getLoggedUser = () => twGet("/user")

const toggleLike = (id) => twPut(`/tweet/${id}/like`)

const retweet=(id,content) => twPost(`/tweet/${id}/retweet`,content)

const TwApi = {
    login,
    logout,
    register,
    isUserLogged,
    trendingTopics,
    getUser,
    getTweet,
    getFollowingTweets,
    postNormalTwit,
    getLoggedUser,
    toggleLike,
    retweet,
    search
}

export default TwApi;