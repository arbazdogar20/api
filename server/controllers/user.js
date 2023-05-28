const {UserModel} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const {name, email, password} = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const user = await UserModel({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    await user.save();
    return res
      .status(201)
      .json({data: user, message: 'User Register Successfully'});
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({email: req.body.email});
    if (!findUser) return res.status(404).json('User Not Found');

    const compare = await bcrypt.compare(req.body.password, findUser.password);
    if (!compare) return res.status(401).json('Wrong Credentials');

    const token = jwt.sign({id: findUser._id}, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const headers = {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    };

    res.set(headers);

    return res.status(200).json('Working');
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
};
