import User from '../models/user';
import jwt from 'jwt-simple';

import config from '../config/dev';

function tokenForUse(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret)
}


export const signin = (req, res, next) => {
  // User has already had their email and password auth'd
  // we just need to give them token
  res.send({ token: tokenForUse(req.user)})
};


export const signUp = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password are required!'})
  }

  // check if a user email is existed
  User.findOne({ email }, (error, existingUser) => {
    if (error) { return next(error)}

    // if it exists, return error

    if (existingUser) {
      return res.status(422).send({
        error: 'Email is in use'
      })
    }

    // if not create and save user record
    const user = new User({
      email,
      password,
    });

    user.save((error) => {
      if (error) return next(error);
      // if not create and save user record
      res.json({ token: tokenForUse(user) });

    })


  });




  // respond to request indicating the user was created
};
