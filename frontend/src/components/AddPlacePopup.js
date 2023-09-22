import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup(props) {
  const {isOpen, onAddPlace, onClose} = props;
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    };
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({name, link});
  }

  function handleCardName(evt) {
    setName(evt.target.value);
  }

  function handleCardLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm id="2" name="card-new" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit ={handleSubmit} buttonText={"Создать"} classButton={"popup__button popup__button_close"}>
      <div className="popup__field">
        <input id="place-name-input" type="text" className="popup__input popup__input_type_place-name" name="title" value={name} onChange={handleCardName} placeholder="Название" required />
        <span className="place-name-input-error popup__input-error"></span>
      </div>
      <div className="popup__field">
        <input id="place-link" type="url" className="popup__input popup__input_type_link" name="link" value={link} onChange={handleCardLink} placeholder="Ссылка на картинку" required />
        <span className="place-link-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}