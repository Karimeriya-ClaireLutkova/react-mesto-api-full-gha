function ImagePopup(props) {
  const {name, card, onClose} = props;
  const className=`popup popup_type_${name} ${(card && card.link !== "") ? "popup_opened" : ""}`;

  return(
    <div className={className}>
      <div className="popup__container popup__container_type_image">
        <button type="button" onClick={onClose} className="popup__button popup__button_close popup__button_close_form-grow" aria-label="Закрыть форму просмотра картинки" />
        <figure className="popup__form-image">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__subtitle">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;