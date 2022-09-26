const jwt = require("jsonwebtoken");
const { User } = require("../models");
const _const = require("./const");

exports.getUserByToken = async (req) => {
  try {
    let token = req.header("Authorization");

    if (token == null || token == undefined) {
      return {
        status: false,
        message: "Authorization token not found",
        data: null,
        err: null,
      };
    }

    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(user);

    if (user) {
      const userData = await User.findOne({ where: { uuid: user.id } });

      console.log(userData, "ADAS");

      return userData;
    } else {
      return {
        status: false,
        message: "User Data not found",
        data: null,
        err: "User tidak terdaftar",
      };
    }
  } catch (err) {
    return {
      status: false,
      message: "User Data not found",
      data: null,
      err: err.stack,
    };
  }
};

exports.getAdminByToken = async (req) => {
  try {
    let token = req.header("Authorization");
    console.log(token);
    if (token == null || token == undefined) {
      return {
        status: false,
        message: "Authorzation token not found",
        data: null,
        err: null,
      };
    }

    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (user) {
      const userData = await User.findOne({
        email: user.email,
        role: _const.ROLE.ADMIN,
      }).lean();
      if (userData) {
        return userData;
      } else {
        return {
          status: false,
          message: "User data not found",
          data: null,
          err: "Anda bukan admin",
        };
      }
    } else {
      return {
        status: false,
        message: "User data not found",
        data: null,
        err: "Anda bukan admin",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: "Unknown error",
      data: null,
      err: err.stack,
    };
  }
};
