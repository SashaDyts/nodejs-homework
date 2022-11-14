const fs = require('fs/promises');
const jimp = require('jimp');
const path = require('path');
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const extension = originalname.split('.').pop();
  const filename = `${_id}.${extension}`;

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);

  const avatar = await jimp.read(resultUpload);
  await avatar.resize(250, 250).write(resultUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
