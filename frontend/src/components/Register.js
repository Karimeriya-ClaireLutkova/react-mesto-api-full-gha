import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import PopupWithForm from './PopupWithForm.js';

export default function Register(props) {
  const {isOpen, loggedIn, onSubmit, onClose, onAuthorization} = props;
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(userEmail, password);
    setUserEmail('');
    setPassword('');
  }

  return (
    <>
      <Header id="2" title="Войти" loggedIn={loggedIn} onAuthorization={onAuthorization} />
      <PopupWithForm id="5" name="registration-user" title="Регистрация"
                     isOpen={isOpen}
                     onClose={onClose}
                     onSubmit={handleSubmit}
                     classButton={"popup__button popup__button_close popup__button_close_inactive"}
                     buttonText={"Зарегистрироваться"}>
        <div className="popup__field">
          <input id="user-email-input" type="email" className="popup__input popup__input_type_entry" name="email" placeholder="Email" value={userEmail} onChange={handleChangeEmail} required  />
          <span className="user-email-input-error popup__input-error"></span>
        </div>
        <div className="popup__field">
          <input id="user-password-input" type="password" className="popup__input popup__input_type_entry" name="password" placeholder="Пароль" value={password} onChange={handleChangePassword} required />
          <span className="user-password-input-error popup__input-error"></span>
        </div>
      </PopupWithForm>
      <div className="popup__redirection">
        <p className="popup__title_type_redirection">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="popup__link_type_redirection">Войти</Link>
      </div>
   </>
  )
}