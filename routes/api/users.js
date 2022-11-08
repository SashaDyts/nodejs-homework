const express = require('express');
const { users: usersCtrl } = require('../../controllers');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlWrapper(usersCtrl.register)
);

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(usersCtrl.login)
);

router.get('/current', authenticate, ctrlWrapper(usersCtrl.getCurrent));

router.get('/logout', authenticate, ctrlWrapper(usersCtrl.logout));

router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscription),
  ctrlWrapper(usersCtrl.updateSub)
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(usersCtrl.updateAvatar)
);

module.exports = router;
