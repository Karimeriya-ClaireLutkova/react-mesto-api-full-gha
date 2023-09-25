import React from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { register, authorization, getContent } from '../utils/Auth.js';
import '../index.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({_id: '', email: ''});
  const [registrationInfo, setRegistrationInfo] = React.useState({infoStatus: "", message:""});
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(true);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(true);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  React.useEffect(() => {
    const tokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        if (jwt) { 
          getContent(jwt)
            .then((res) => {
              const data = res;
              setUserData({_id: data._id, email: data.email});
              setLoggedIn(true);
              navigate('/', { replace: true });
            })
            .catch((err) => {
              console.log(err);
            })
        }
      }
    };
    tokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err)
    });  
  }, [navigate, loggedIn]); 

  function handleLoginSubmit(userEmail, password) {
    authorization(userEmail, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(err => console.log(err));
  }

  function handleRegisterSubmit(userEmail, password) {
    register(userEmail, password)
      .then((data) => {
        if (data) {
          setRegistrationInfo({infoStatus: true, message:"Вы успешно зарегистрировались!"});
        }
      })
      .catch(() => {
        setRegistrationInfo({infoStatus: false, message:"Что-то пошло не так! Попробуйте ещё раз."});
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      })
  }

  function handleAddPlaceSubmit(item) {
    api.addCardNew(item)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err)
      });
  }

  function handleUpdateUser(item) {
    api.editProfileInfo(item.name, item.about)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err)
      });
  }

  function handleUpdateAvatar(item) {
    api.editProfileAvatar(item)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  function handleCardClick(item) {
    setSelectedCard({...selectedCard, link: item.link, name: item.name});
  }
  
  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setRegisterPopupOpen(false);
    setLoginPopupOpen(false);
    handleCloseInfo();
    setRegistrationInfo({infoStatus: "", message:""});
    setInfoTooltipOpen(false);
  }

  function handleCloseInfo () {
    if (registrationInfo.infoStatus) {
      setLoginPopupOpen(true);
      navigate("/sign-in", {replace: true});  
    } else {
      setRegisterPopupOpen(true);
      navigate("/sign-un", {replace: true});  
    }
  }

  function handleLoginNav() {
    navigate('/sign-in', {replace: true});
  }

  function handleLogoutNav() {
    navigate('/sign-up', {replace: true});
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
    setUserData({_id: '', email: ''});
    setLoginPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute component={Main}
                          loggedIn={loggedIn}
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          isCardClick={handleCardClick}
                          onCardLike={handleCardLike} 
                          cards={cards}
                          onCardDelete={handleCardDelete}
                          onAuthorization={signOut}
                          title="Выйти"
                          email={userData.email}
          />
        }>   
        </Route>
        <Route path="sign-up" element={
          <Register isOpen={isRegisterPopupOpen}
                    loggedIn={loggedIn}
                    onSubmit={handleRegisterSubmit}
                    onClose={closeAllPopups}
                    onAuthorization={handleLoginNav}
          />
        }>   
        </Route>
        <Route path="sign-in" element={
          <Login isOpen={isLoginPopupOpen}
                 loggedIn={loggedIn}
                 userData={userData.email}
                 onSubmit={handleLoginSubmit}
                 onClose={closeAllPopups}
                 onAuthorization={handleLogoutNav}
          />
        }>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        classButton={"popup__button popup__button_close"}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}
                     onAddPlace={handleAddPlaceSubmit}
                     classButton={"popup__button popup__button_close"}
      />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}
                       onUpdateAvatar={handleUpdateAvatar}
                       classButton={"popup__button popup__button_close"}
      />
      <PopupWithForm id="4" name="confirm-deletion" title="Вы уверены?" classButton={"popup__button popup__button_close"} />
      <InfoTooltip name="notification" onClose={closeAllPopups} isOpenInfoTooltip={isInfoTooltipOpen} status={registrationInfo.infoStatus} registrationInfo={registrationInfo.message} />
      <ImagePopup name="image-view" card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  )
}

export default App;