import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar} = props;
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  
  return (
    <PopupWithForm id="3" name="profile-avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} buttonText={"Сохранить"} onSubmit={handleSubmit} classButton={"popup__button popup__button_close"}>
      <div className="popup__field">
        <input id="avatar-link" type="url" className="popup__input popup__input_type_link" name="avatar" placeholder="Ссылка на картинку" ref={avatarRef} required />
        <span className="avatar-link-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}