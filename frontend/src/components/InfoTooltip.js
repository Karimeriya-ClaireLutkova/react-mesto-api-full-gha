import React from 'react';
import registrationSucces from '../images/registration-success.svg';
import registrationError from '../images/registration-error.svg';

function InfoTooltip (props) {
  const {name, isOpenInfoTooltip, registrationInfo, onClose, status} = props;
  const className=`popup popup_type_${name} ${isOpenInfoTooltip ? "popup_opened" : ""}`;
  const src = `${status ? registrationSucces : registrationError}`;
  const alt = `${status ? "Регистрация прошла успешно" : "Ошибка при регистрации"}`;

  return (
    <div className={className}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button type="button" onClick={onClose} className={`popup__button popup__button_close popup__button_close_${name}`} aria-label="Закрыть уведомление" />
        <div className={`popup__form-info popup__form-info_${name}`}>
          <img className={`popup__image popup__image_${name}`} src={src} alt={alt} />
          <h2 className={`popup__title popup__title_${name}`}>{registrationInfo}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;