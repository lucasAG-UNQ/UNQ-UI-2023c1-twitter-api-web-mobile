import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.192:7070';

const login = (loginData) => {
    axios.post(`/login`, loginData)
      .then( (response) => {
        console.log(response)
        localStorage.setItem('twitterAcessToken', response.headers.authorization);
        axios.defaults.headers.common['authorization'] = response.headers.authorization;
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

const logout = () => {
  localStorage.removeItem('twitterAcessToken');
  axios.defaults.headers.common['authorization'] = null;
}

const isUserLogged = () => {
  return !!localStorage.getItem('twitterAcessToken')
}

const TwApi = {
    login,
    logout,
    isUserLogged
}

export default TwApi;