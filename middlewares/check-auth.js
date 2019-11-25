const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
module.exports = async (req, res, next) => {
  //Verifica el token que recibe del front-end para permitir acceso a las diferentes rutas de la api

  const token = req.headers.authorization || '';

  if (token) {
    const user = parseToken(token);
    let foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      next();
    } else {
      return res.status(401).json({
        message: 'No estás autorizado'
      });
    }
  } else {
    return res.status(422).json({
      message: 'No estás autorizado'
    });
  }
};

function parseToken(token) {
  if (token.includes('Bearer')) {
    return jwt.decode(
      token.split(' ')[1],
      'palabra_secreta_que_deberia_guardar_y_hashear_en_la_db'
    );
  }

  return token;
}
