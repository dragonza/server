import mongoose from "mongoose";
import bcrypt from 'bcrypt-nodejs';


const { Schema } = mongoose;

// Define our model

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook, encrypt password
// Before saving a modal, running this func
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);

    /// hash our password
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      // over current password with encrypted one
      user.password = hash;
      next();
    });
  })
});
// Create the model class

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
    if (error) {
      callback(error)
    }

    callback(null, isMatch)
  })
};

const ModelClass = mongoose.model('user', userSchema);


// Export the model
export default ModelClass;
