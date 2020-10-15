const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function (res, req, next) {
    userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      function(err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "ok",
            message: "user created successfully!!",
            data: null,
          });
        }
      },
    });
  },
  authenticate: function (res, req, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "ok",
            message: "user has been authenticated!",
            data: { user: userInfo, token: token },
          });
        } else {
          res.json({ status: "error", message: "Invalid email/password!!" });
        }
      }
    });
  },
};
