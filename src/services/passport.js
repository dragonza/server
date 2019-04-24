import passport from "passport";
import User from "../models/user";
import config from "../config/dev";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import LocalStrategy from "passport-local";

// create passport local strategy
// this func help to verify the email and password from client with our server
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({ email }, (error, user) => {
    if (error) {
      return done(error);
    }
    if (!user) {
      return done(null, false);
    }

    // compare password - is equal to user.password
    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        return done(error);
      }
      if (!isMatch) {
        return done(null, false);
      }

      // passport sent to another func under req in router
      return done(null, user);
    });
  });
});
// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// create JWT strategy
// this func is used to verify token when client side request sth on the server
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // payload is token { sub: 'user.id', iat: timeStamp }
  // See if the user ID in the payload exists in our db
  // if it does, call done with that user
  // otherwise, call done without a user obj

  User.findById(payload.sub, (error, user) => {
    if (error) {
      return done(error, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
