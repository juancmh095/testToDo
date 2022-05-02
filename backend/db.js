const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/database-db';

mongoose.connect(URI)
    .then(dc => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;