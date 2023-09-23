class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {headers: this._headers, credentials: "include"})
      .then((res) => this._checkResponseRequest(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {headers: this._headers, credentials: "include"})
    .then((res) => this._checkResponseRequest(res))
  }

  editProfileInfo(name, about) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name, about}),
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
    })
    .then((res) => this._checkResponseRequest(res))
  }

  addLike(item) {
    return fetch(`${this._baseUrl}cards/likes/${item}`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
    })
    .then((res) => this._checkResponseRequest(res))
  }

  deleteLike(item) {
    return fetch(`${this._baseUrl}cards/likes/${item}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    })
    .then((res) => this._checkResponseRequest(res))
  }

  deleteCard(item) {
    return fetch(`${this._baseUrl}cards/${item}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
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
const token = localStorage.getItem('jwt');
const api = new Api({
  baseUrl: 'https://api.pract.mesto.students.nomoredomainsrocks.ru',
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

export default api;