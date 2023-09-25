import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (`element__button element__button_like ${isLiked && "element__button_like_active"}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <button type="button" className="element__button element__button_delete element__button_delete_active" aria-label="Удалить карточку места" onClick={handleDeleteClick} />}
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-like">
          <button type="button" className={cardLikeButtonClassName} aria-label="Поставить отметку" onClick={handleLikeClick} />
          <span className="element__counter-like">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;