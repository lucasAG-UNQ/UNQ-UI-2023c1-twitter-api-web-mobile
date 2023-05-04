import { useRouteError } from "react-router-dom";
import Sidebar from "../molecules/sidebar";

const NotFound = () => {
  const routingError = useRouteError()
  return (
    <div>
      <p>440 - notfound page</p>
      <p>{routingError.statusText || routingError.message}</p>
    </div>
  )
}

export default NotFound