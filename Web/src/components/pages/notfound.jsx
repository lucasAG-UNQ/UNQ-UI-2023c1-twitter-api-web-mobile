import React from 'react';
import { useRouteError } from "react-router-dom";

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