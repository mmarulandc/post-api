const User = require("../models/userModel");
const Bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let { username, password, email } = req.body;
    if (!username || username === null || username === undefined) {
      return res.status(400).json({
        message: "El nombre de usuario es necesario para el registro"
      });
    }
    if (!password || password === null || password === undefined) {
      return res.status(400).json({
        message: "La contraseña es necesaria para el registro"
      });
    }
    if (!email || email === null || email === undefined  ) {
      return res.status(400).json({
        message: "El email es necesario para el registro"
      });
    } else if(!emailPattern.test(email)) {
      return res.status(400).json({
        message: "El campo email no cumple con los requisitos"
      });
    }

    let isRegistered = await User.find({ email: email });

    if (isRegistered.length > 0) {
      return res.status(400).json({
        message: "Ya hay un usuario registrado con este email"
      });
    }
    //Se hashea la contraseña
    password = Bcrypt.hashSync(password, 10);

    let newUser = new User({
      username: username,
      password: password,
      email: email
    });
    await newUser.save();
    return res.status(200).json({
      message: "El usuario se ha registrado con exito"
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Ha ocurrido un error al registrarse, por favor intentelo más tarde"
    });
    console.log(`Ha ocurrido un error ${err}`);
  }
};

module.exports = signup;
