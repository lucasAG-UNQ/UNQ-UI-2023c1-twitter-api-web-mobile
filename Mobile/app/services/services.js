import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'http://localhost:7070';
//axios.defaults.baseURL = 'http://192.168.0.10:7070';

const twPost = (endpoint, data) => {
  retrieveDataFromStorage('twitterAccessToken')
    .then(data=>axios.defaults.headers.common['authorization'] = data);
  return axios.post(endpoint, data)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

const twGet = (endpoint) => {
  retrieveDataFromStorage('twitterAccessToken')
    .then(data=>axios.defaults.headers.common['authorization'] = data);
  return axios.get(endpoint)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

const twPut = (endpoint)=>{
  retrieveDataFromStorage('twitterAccessToken')
    .then(data=>axios.defaults.headers.common['authorization'] = data);
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
    return Promise.reject(apiError('REQUEST_ERROR', error.code, error.code, `Error consultando al servidor: [${error.code}] ${error.message}`));
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(apiError('UNEXPECTED_ERROR', error.code, error.code, error.message));
  }
}


const login = (loginData) => twPost('/login', loginData);

const register = (regData) => twPost('/register', regData);

const logout = () => {
  deleteDataFromStorage('twitterAccessToken');
  axios.defaults.headers.common['authorization'] = null;
}

const isUserLogged = () =>!!twitterAccessToken();

const twitterAccessToken = () => {
    let token = null;
    retrieveDataFromStorage('twitterAccessToken')
      .then( val => token = val);
    console.log('t a token ', token);
    return token  
};

// ToDo: cambiar esto
//const twitterAccessToken = () => {
//  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InVfMjgifQ.L8cTlW6Q8Obe-v6qeDrxOkR-lLAJDLq1ysRdo4nTwH0'
//};

const trendingTopics = () => twGet('/trendingTopics');

const getUser = (id) => twGet(`/user/${id}`);

const getTwitt = (id) => twGet(`/tweet/${id}`);

const search = (text) => twGet(`/search/?text=${text}`);

const getFollowingTwitts = () => twGet("/user/followingTweets");

const postNormalTwitt = (data) => twPost("/tweet", data);

const getLoggedUser = () => twGet("/user")

const toggleLike = (id) => twPut(`/tweet/${id}/like`)

const retwitt = (id,content) => twPost(`/tweet/${id}/retweet`,content)

const followUser = (id) => twPut(`/user/${id}/follow`)

const reply = (id,content) => twPost(`/tweet/${id}/replay`,content)

// storage management
const saveDataToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    throw new Error(error);
  }
};

const retrieveDataFromStorage =  async (key) => {
  try {
    const token = await AsyncStorage.getItem(key)

    console.log("llamado a retrieve, res: " + token )

    return token
  } catch(error) {
    throw new Error(error);
  }
}

const deleteDataFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error(error);
  }
};

const TwApi = {
    login,
    logout,
    register,
    isUserLogged,
    trendingTopics,
    getUser,
    getTwitt,
    getFollowingTwitts,
    postNormalTwitt,
    getLoggedUser,
    toggleLike,
    retwitt,
    search,
    followUser,
    reply,
    saveDataToStorage,
    retrieveDataFromStorage,
    deleteDataFromStorage
}

export default TwApi;