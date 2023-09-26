const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserСurrent,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserСurrent);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(
      /^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/i,
    ),
  }),
}), updateAvatar);

module.exports = router;
