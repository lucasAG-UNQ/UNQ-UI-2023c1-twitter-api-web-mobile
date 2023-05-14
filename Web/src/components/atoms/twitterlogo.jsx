import React from 'react';
import logo from '../../assets/twitter_logo.png';

const TwitterLogo = (props) => {
  return (
    <img src={logo} alt="Twitter" className={props.sizeClass} />
  )
}

export default TwitterLogo
