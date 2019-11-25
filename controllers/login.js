const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let { email, password } = req.body;
    if (!password || password === null || password === undefined) {
      return res.status(400).json({
        message: "La contraseña es necesaria para ingresar"
      });
    }
    if (!email || email === null || email === undefined) {
      return res.status(400).json({
        message: "El email es necesario para ingresar"
      });
    } else if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "El campo email no cumple con los requisitos"
      });
    }

    let findedUser = await User.findOne({ email: email });
    if (!findedUser) {
      return res.status(401).json({
        message: "No se ha encontrado un email registrado"
      });
    }
    console.log("Se ha encontrado el usuario");
    //se compara la contraseña ingresada y la contraseña en la base de datos
    if (!bcrypt.compareSync(password, findedUser.password)) {
      return res.status(401).json({
        message: "La contraseña no coincide"
      });
    }
    console.log("La contraseña coincide");
    //se crea el token con el email y el id de usuario
    const token = jwt.sign(
      { username: findedUser.username, password: findedUser.password },
      "palabra_secreta_que_deberia_guardar_y_hashear_en_la_db",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Ha ingresado con exito",
      token: token
    });
  } catch (err) {
    res.status(500).json({
      message: "Ha ocurrido un error al logearse, por favor intentelo más tarde"
    });
    console.log(`Ha ocurrido un error ${err}`);
  }
};

module.exports = login;
