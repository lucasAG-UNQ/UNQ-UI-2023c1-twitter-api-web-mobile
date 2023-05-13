import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7070';

const twPost = (endpoint, data) => {
    axios.post(endpoint, data)
      .then( (response) => {
        //console.log(response)
        localStorage.setItem('twitterAcessToken', response.headers.authorization);
        axios.defaults.headers.common['authorization'] = response.headers.authorization;
       setToken(true);
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

const login = (loginData) => { twPost('/login', loginData)}

const logout = () => {
  localStorage.removeItem('twitterAcessToken');
  axios.defaults.headers.common['authorization'] = null;
}

const isUserLogged = () => {
  return !!localStorage.getItem('twitterAcessToken')
}

const trendingTopics = () => { twGet('/trendingTopics') }

const TwApi = {
    login,
    logout,
    isUserLogged,
    trendingTopics
}

export default TwApi;