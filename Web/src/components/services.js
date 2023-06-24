import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7070';

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

const twPut = (endpoint)=>{
  axios.defaults.headers.common['authorization'] = localStorage.getItem('twitterAcessToken');
  return axios.put(endpoint)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

// this helps the error handle return a common error for every case
const apiError = (type, code, status, description) => { return {type, code, status, description} }

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return Promise.reject(apiError('RESPONSE_ERROR', error.code, error.response.status, error.response.data.title));
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // return Promise.reject(apiError('REQUEST_ERROR', error.code, error.code, `Error consultando al servidor: [${error.code}] ${error.message}`));
    return Promise.reject(apiError('REQUEST_ERROR', error.code, error.code, 'Error consultando al servidor. Intente nuevamente más tarde.'));
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(apiError('UNEXPECTED_ERROR', error.code, error.code, error.message));
  }
}


const login = (loginData) => twPost('/login', loginData);

const register = (regData) => twPost('/register', regData);

const logout = () => {
  localStorage.removeItem('twitterAcessToken');
  axios.defaults.headers.common['authorization'] = null;
}

const isUserLogged = () => !!localStorage.getItem('twitterAcessToken');

const trendingTopics = () => twGet('/trendingTopics')

const getUser = (id) => twGet(`/user/${id}`);

const getTweet = (id) => twGet(`/tweet/${id}`);

const search = (text) => twGet(`/search/?text=${text}`);

const getFollowingTweets = () => twGet("/user/followingTweets");

const postNormalTweet = (data) => twPost("/tweet", data);

const getLoggedUser = () => twGet("/user")

const toggleLike = (id) => twPut(`/tweet/${id}/like`)

const retweet = (id,content) => twPost(`/tweet/${id}/retweet`,content)

const followUser = (id) => twPut(`/user/${id}/follow`)

const reply = (id,content) => twPost(`/tweet/${id}/replay`,content)

const TwApi = {
    login,
    logout,
    register,
    isUserLogged,
    trendingTopics,
    getUser,
    getTweet,
    getFollowingTweets,
    postNormalTweet,
    getLoggedUser,
    toggleLike,
    retweet,
    search,
    followUser,
    reply
}

export default TwApi;