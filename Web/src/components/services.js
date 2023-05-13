import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7070';

const login = (loginData, setToken, setError) => {
    axios.post(`/login`, loginData)
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