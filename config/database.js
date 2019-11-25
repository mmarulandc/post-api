const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mmarulandc:mateo246810@mmarulandc-zwaox.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
  .then(console.log('CONECTED TO DATABASE'))
  .catch(error => console.log(error));

