import React from 'react';
import logoHeader from '../images/logo_header.svg';

function Header(props) {
  const {email, loggedIn, title, onAuthorization} = props;

  return (
    <header className={`header ${loggedIn ? "header_login-active" : ""}`}>
      <img className="header__logo" alt="Логотип Mesto.Russia" src={logoHeader}/>
      <div className={`header__info ${loggedIn ? "header__info_login-active" : ""}`}>
        <p className={`header__email ${loggedIn ? "header__email_active" : ""}`}>{email}</p>
        <button type="button" className="header__button" onClick={onAuthorization}>{title}</button>
      </div>     
    </header>
  )
}

export default Header;