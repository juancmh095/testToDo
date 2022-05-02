const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const { mongoose } = require('./db');
var bodyParser = require('body-parser');


/////setting
app.set('port', process.env.PORT || 3000);

/////middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
var whitelist = ['http://localhost:8100',''];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }  
}
app.use(cors(corsOptions));

///routes
app.use('/', require('./general.routes'));


app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});