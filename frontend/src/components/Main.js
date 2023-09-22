import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main(props) {
  const {onEditAvatar, onEditProfile, onAddPlace, isCardClick, onCardLike, onCardDelete} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-edit">
          <button type="button" onClick={onEditAvatar} className="profile__button profile__button_edit-photo"  aria-label="Изменить аватар"></button>
          <img className="profile__avatar" src={currentUser.avatar} alt="Фотография пользователя" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__profession">{currentUser.about}</p>
          <button type="button" onClick={onEditProfile} className="profile__button profile__button_edit" aria-label="Редактировать профиль"></button>
        </div>
        <button type="button" onClick={onAddPlace} className="profile__button profile__button_add" aria-label="Добавить карточку места"></button>
      </section>
      <section className="elements" aria-label="Фотографии мест">
        {props.cards.map((card, i) => (
          <Card key={card._id} card={card} onCardClick={isCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main;