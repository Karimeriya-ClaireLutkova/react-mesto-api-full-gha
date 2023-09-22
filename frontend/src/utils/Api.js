class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {headers: this._headers})
      .then((res) => this._checkResponseRequest(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {headers: this._headers})
    .then((res) => this._checkResponseRequest(res))
  }

  editProfileInfo(name, about) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name, about}),
    })
    .then((res) => this._checkResponseRequest(res))
  }

  editProfileAvatar(item) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    })
    .then((res) => this._checkResponseRequest(res))
  }

  addCardNew(item) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    })
    .then((res) => this._checkResponseRequest(res))
  }

  addLike(item) {
    return fetch(`${this._baseUrl}cards/likes/${item}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then((res) => this._checkResponseRequest(res))
  }

  deleteLike(item) {
    return fetch(`${this._baseUrl}cards/likes/${item}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => this._checkResponseRequest(res))
  }

  deleteCard(item) {
    return fetch(`${this._baseUrl}cards/${item}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => this._checkResponseRequest(res))
  }

  changeLike(cardId, isLikedInfo) {
    if (isLikedInfo) {
      return this.deleteLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }

  _checkResponseRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68/',
  headers: {
    authorization: 'fcd98cd3-4216-4409-b17a-f7511209a4fb',
    'Content-Type': 'application/json'
  }
});

export default api;