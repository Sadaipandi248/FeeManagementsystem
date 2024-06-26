const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminschema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    staffID:{
        type:String,
        required:true,
    }
})

const Admin = mongoose.model('Admin',adminschema)

module.exports = Admin