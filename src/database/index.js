require('dotenv').config()

const moongose = require('mongoose');

moongose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

module.exports = moongose