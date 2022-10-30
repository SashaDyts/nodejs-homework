const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const { contacts: contactsCtrl } = require('../../controllers');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(contactsCtrl.getAll));

router.get(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(contactsCtrl.getById)
);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(contactsCtrl.add)
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(contactsCtrl.remove)
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(contactsCtrl.update)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.updateStatusContactSchema),
  ctrlWrapper(contactsCtrl.updateStatusContact)
);

module.exports = router;
