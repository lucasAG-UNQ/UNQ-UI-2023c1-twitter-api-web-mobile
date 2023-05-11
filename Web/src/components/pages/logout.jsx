import React from 'react';

const Logout = () => {
  
  localStorage.removeItem('twitterAcessToken');

  return (
    <div>Logout</div>
  )
}

export default Logout