import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser} = props;
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    };
  }, [isOpen, currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm id="1" name="profile-info" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={"Сохранить"} classButton={"popup__button popup__button_close"}>
      <div className="popup__field">
        <input id="profile-name-input" type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя" value={name} onChange={handleChangeName} required  />
        <span className="profile-name-input-error popup__input-error"></span>
      </div>
      <div className="popup__field">
        <input id="profile-profession-input" type="text" className="popup__input popup__input_type_profession" name="about" placeholder="Профессия" value={description} onChange={handleChangeDescription} required />
        <span className="profile-profession-input-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}