const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

// SIGN UP
router.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    return res
      .status(400)
      .json({ message: "Por favor insira usuário e senha para cadastro." });
  }
  if (password.length < 7) {
    return res
      .status(400)
      .json({ message: "Por favor insira com no mínimo 8 caracteres." });
  }

  const result = await User.findOne({ username });
  console.log(result);
  if (result) {
    return res
      .status(400)
      .json({ message: "Nome de usuário já existe, por favor escolha outro." });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  const savedUser = await User.create({ username, password: hashPass });

  return res.status(201).json({ savedUser });
});

// LOGIN
router.post("/user/login", (req, res, next) => {
  passport.authenticate("local", (err, userObj, failureDetails) => {
    if (err) {
      return res.status(500).json({
        message:
          "Tivemos um problema na autenticação. Por favor tente novamente",
      });
    }
    if (!userObj) {
      return res.status(401).json(failureDetails);
    }
    req.login(userObj, (err) => {
      if (err) {
        return res.status(500).json({
          message:
            "Houve um erro no resgistro da sessão. Por Favor tente novamente",
        });
      }
    });
    return res.status(200).json({ userObj });
  })(req, res, next);
});

// LOGOUT

router.post("/user/logout", async (req, res) => {
  req.logout();
  return res.status(200).json({ message: "Sessão encerrada!" });
});

//AUTHENTICATION

router.get("/user/loggedin", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(401).json({ message: "Acesso não autorizado!" });
});

module.exports = router;
