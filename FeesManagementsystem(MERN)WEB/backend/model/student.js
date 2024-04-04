const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    regnum: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    fees: [
        {
            feetype: String,
            feeamount: Number,
        },
    ],
    
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
