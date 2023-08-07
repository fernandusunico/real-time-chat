// authController.js
const authService = require("../service/authService");

async function registerUser(req, res) {
  const { email, password, first_name, avatar_path, confirm_password } =
    req.body;

  if (password !== confirm_password) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match." });
  }
  const result = await authService.registerUser(
    email,
    password,
    first_name,
    avatar_path
  );

  if (result.success) {
    return res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } else {
    return res.status(result.statusCode || 500).json({
      success: false,
      message: result.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const result = await authService.loginUser(email, password);

  if (result.success) {
    return res.status(200).json({
      success: true,
      userToken: result.userToken,
    });
  } else {
    return res.status(result.statusCode || 500).json({
      success: false,
      message: result.message,
    });
  }
}

module.exports = {
  registerUser,
  login,
};
