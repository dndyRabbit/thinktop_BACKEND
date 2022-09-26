const { User } = require("../models");
const jwt = require("jsonwebtoken");

const { RegexPattern, RegexValidation } =
  require("regexpattern-collection").default;

const { getUserByToken, getAdminByToken } = require("../helper/auth");

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;

  let err = {
    email: null,
    password: null,
  };

  let status = true;
  if (!RegexValidation.hasMatch(email, RegexPattern.email)) {
    status = false;
    err.email = "Email tidak valid";
  }

  if (!RegexValidation.hasMatch(password, RegexPattern.passwordModerate)) {
    status = false;
    err.password =
      "Password minimal mengandung huruf kecil, huruf besar, angka, dan minimal 8 karakter.";
  }

  if (!status) {
    return res.status(400).json({
      status,
      message: "Field tidak valid.",
      data: null,
      err,
    });
  } else {
    next();
  }
};

const registerValidator = async (req, res, next) => {
  const { email, password, name } = req.body;

  let err = {
    name: null,
    email: null,
    password: null,
  };
  let status = true;

  if (!RegexValidation.hasMatch(email, RegexPattern.email)) {
    status = false;
    err.email = "Email tidak valid";
  }

  if (name == undefined || name.trim() == "") {
    status = false;
    err.name = "Nama tidak boleh kosong";
  }

  if (!RegexValidation.hasMatch(password, RegexPattern.passwordModerate)) {
    status = false;
    err.password =
      "Password minimal mengandung huruf kecil, huruf besar, angka, dan minimal 8 karakter.";
  }

  if (!status) {
    return res.status(400).json({
      status,
      message: "Field tidak valid",
      data: null,
      err,
    });
  } else {
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      return res.status(400).json({
        status: false,
        message: "Email sudah ada",
        data: null,
      });
    } else {
      next();
    }
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await getUserByToken(req);

    if (user.status == undefined) {
      req.body.user = user;
      next();
    } else {
      return res.status(400).json(user);
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Authorization Error",
      data: null,
      err,
    });
  }
};

const isAdminLoggedIn = async (req, res, next) => {
  try {
    const user = await getAdminByToken(req);
    if (user.status == undefined) {
      req.body.user = user;
      next();
    } else {
      return res.status(400).json(user);
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Authorization Error",
      data: null,
      err: error,
    });
  }
};

module.exports = {
  loginValidator,
  registerValidator,
  isLoggedIn,
  isAdminLoggedIn,
};
