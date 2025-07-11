import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// this is a hook that will run before saving the data to the db and we should not use an arrow function here as we need to use the 'this' keyword and in arrow function the 'this' keyword doesn't work the same. This here will refer to something that we are saving to the db. For example here, this will refer to the user data that we are saving to the db.
userSchema.pre("save", async function (next) {
  // this has some available methods here and one is the isModified(). isModified() will make sure if password is not modified and if it is true, then we will not hash the password as we don't need to do that and we will move on.
  if (!this.isModified()) {
    next();
  }

  // 1) create a salt which is like a key that is used to hash the passwords.
  const salt = await bcrypt.genSalt(10);

  // 2) hash the password
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
