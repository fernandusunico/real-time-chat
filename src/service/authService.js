const models = require("../../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
var appSeckertKey = require("../config/appConfig").secret;

async function registerUser(email, password, first_name, avatar_path) {
  try {
    const existingUser = await models.users.findOne({ where: { email } });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Please choose a different email.",
      };
    }

    const newUser = await models.users.create({
      email,
      password,
      first_name,
      avatar_path,
    });

    if (newUser) {
      return {
        success: true,
        message: "User created successfully.",
        user: {
          user_id: newUser.id,
          first_name: newUser.first_name,
          email: newUser.email,
          avatar_path: newUser.avatar_path,
        },
      };
    } else {
      return {
        success: false,
        message: "Failed to create user. Please try again later.",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "There was an error creating the user. Please try again later.",
    };
  }
}

async function loginUser(email, password) {
  try {
    const user = await models.users.findOne({
      where: { email: email, password: md5(password) },
    });

    if (!user) {
      return {
        success: false,
        message: "Authentication failed. User not found.",
      };
    }

    const tokenPayload = {
      user_id: user.id,
      first_name: user.first_name,
      email: user.email,
      avatar_path: user.avatar_path,
    };

    const token = jwt.sign(tokenPayload, appSeckertKey, {
      expiresIn: 60 * 60 * 24,
    });

    return { success: true, userToken: token };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "There was an error attempting to login. Please try again later.",
    };
  }
}

module.exports = {
  registerUser,
  loginUser,
};
