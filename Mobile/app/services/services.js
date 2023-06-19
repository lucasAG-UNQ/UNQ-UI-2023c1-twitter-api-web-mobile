import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

//axios.defaults.baseURL = 'http://localhost:7070';
axios.defaults.baseURL = 'http://192.168.0.91:7070';

const twPost = (endpoint, data) => {
  axios.defaults.headers.common['authorization'] = retrieveData('twitterAcessToken');
  return axios.post(endpoint, data)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

const twGet = (endpoint) => {
  axios.defaults.headers.common['authorization'] = retrieveData('twitterAcessToken');
  return axios.get(endpoint)
    .then( ( response ) => response )
    .catch( (error) => handleError(error) );
}

const twPut = (endpoint)=>{
  axios.defaults.headers.common['authorization'] = retrieveData('twitterAcessToken');
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
  deleteData('twitterAcessToken');
  axios.defaults.headers.common['authorization'] = null;
}

const isUserLogged = () => !!retrieveData('twitterAcessToken');

const trendingTopics = () => twGet('/trendingTopics')

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

const saveData = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log('Error al guardar los datos:', error);
  }
};

const retrieveData = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error al recuperar los datos:', error);
  }
};
const deleteData = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error al eliminar el ítem:', error);
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
    saveData,
    retrieveData,
    deleteData
}

export default TwApi;