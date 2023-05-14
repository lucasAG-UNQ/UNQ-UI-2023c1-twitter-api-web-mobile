import axios from 'axios';


const headers={authorization:localStorage.getItem('twitterAcessToken')}
const baseURL = 'http://localhost:7070'

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

async function getUser(){
  const userTest= await axios({method:'get',
                                  url:`${baseURL}/user`,
                                  headers: headers})
  return(userTest.data)
}

function postNormalTwit(twit){
  console.log(headers)
  axios({method:'post',
          url:`${baseURL}/tweet`,
          data:twit, 
          headers:headers})
  .then(response=>{
    console.log(response)
  })
  .catch(error=>{
    console.log(error)
  })
}

const TwApi = {
    login,
    getUser,
    postNormalTwit
}
export default TwApi;