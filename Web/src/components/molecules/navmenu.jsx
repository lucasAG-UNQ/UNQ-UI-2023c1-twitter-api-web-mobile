import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <nav>
        <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/user"}>Usuario</Link></li>
        </ul>
    </nav>
  )
}

export default NavMenu