import axios from 'axios';

const baseURL = 'http://192.168.0.192:7070'

const login = () => {
    axios.post(`${baseURL}/login`, { username: 'a', password: 'a'})
    .then(response => {
      console.log(response)
      localStorage.setItem('twitterAcessToken', response.headers.authorization);
    })
    .catch(error => {
      console.log('Error: ' , error.response.data.message)
    })
}

const TwApi = {
    login
}
export default TwApi;