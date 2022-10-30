const { User } = require('../../models/user');

const updateSub = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  //   console.log(req.body.subscription);
  console.log(_id);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      subscription,
    },
    { new: true }
  );

  console.log(user);

  res.json({ user });
};

module.exports = updateSub;
