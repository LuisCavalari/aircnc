const mongoose = require('../../database')

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('User',UserSchema)