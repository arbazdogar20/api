const db = require('../database/connect');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

// register
const register = (req, res) => {
  const {username, email, password, name} = req.body;
  // Check User IF Exist
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json('User Already Exist');
    // Create A New User
    // Hash Password
    const encryptPassword = CryptoJs.AES.encrypt(
      password,
      process.env.PASS_SECRET
    ).toString();

    const q =
      'INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)';
    //   one way
    // db.query(q, [username, email, encryptPassword, name]);
    // another way
    const values = [username, email, encryptPassword, name];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json('User Is Created');
    });
  });
};

// login
const login = async (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User Not Found');

    const hashPassword = CryptoJs.AES.decrypt(
      data[0].password,
      process.env.PASS_SECRET
    );

    const passwords = hashPassword.toString(CryptoJs.enc.Utf8);

    if (passwords !== req.body.password)
      return res.status(401).json('Invalid Username & Password');

    const {password, ...others} = data[0];

    // JWT SIGN
    const token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET);
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

// logout
const logout = async (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('Logout Successfully');
};

module.exports = {
  register,
  login,
  logout,
};
