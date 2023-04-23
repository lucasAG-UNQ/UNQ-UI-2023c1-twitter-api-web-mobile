import { useRouteError } from "react-router-dom";
import NavMenu from "../molecules/navmenu";

const NotFound = () => {
  const routingError = useRouteError()
  return (
    <div>
      <NavMenu />
      <p>440 - notfound page</p>
      <p>{routingError.statusText || routingError.message}</p>
    </div>
  )
}

export default NotFound