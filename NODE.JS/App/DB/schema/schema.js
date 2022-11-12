const mongoose = require("mongoose")

const schema = new mongoose.Schema({

 username: {type: String, required: true, isunique: true},

 email: {type: String, required: true, lowercase: true, isunique: true},

 password: {type: String, minlength: 8, required: true},

 active: {
    type: Boolean,
    default: true,
 },

})


module.exports = mongoose.model('schema', schema)