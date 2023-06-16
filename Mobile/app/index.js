import Login from './login';
import Home from './home';
import TwApi from '../components/services/services';

export default function App() {
  let isLoggedUser = TwApi.isUserLogged();
  
  return (isLoggedUser? <Home />: <Login />);
}

