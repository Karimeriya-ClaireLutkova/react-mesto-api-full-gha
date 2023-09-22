import React from 'react';

function PopupWithForm(props) {
  const {name, isOpen, onClose, title, onSubmit, children, buttonText, classButton} = props;
  const className = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className = {className}>
      <div className={`popup__container ${isOpen ? `popup__container_type_${name}` : ""}`}>
        <button type="button" onClick={onClose} className={classButton} aria-label="Закрыть форму" />
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <form className="popup__form" name={name}  onSubmit={onSubmit}>
          <div className="popup__form-info">
            {children}
          </div>
          <button type="submit" className={`popup__button popup__button_save popup__button_${name}`}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;