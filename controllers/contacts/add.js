const { Contact } = require('../../models/contact');

const add = async (req, res, next) => {
  const { _id: owner } = req.user;

  const newContact = { ...req.body };

  const result = await (
    await Contact.create({ ...newContact, owner })
  ).populate('owner', 'email');

  res.status(201).json(result);
};

module.exports = add;
