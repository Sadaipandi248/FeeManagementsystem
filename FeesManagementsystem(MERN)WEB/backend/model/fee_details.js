const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeDetailsSchema = new Schema({
    course: {
        type: String,
        required: true,
    },
    feetype: {
        type: String,
        required: true
    },
    feeamount: {
        type: Number,
        required: true
    }
});

const Feesdetails = mongoose.model('Feesdetail', feeDetailsSchema);

module.exports = Feesdetails;
