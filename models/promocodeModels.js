const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const promocodeSchema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        uppercase: true,
        default: nanoid(12),
        required: true,
    },
    expiresIn: {
        type: Date,
        default: expiresin30days(),
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

function expiresin30days() {
    const DAYS30 = 30 * 24 * 60 * 60 * 1000;
    const EXPIRESIN = new Date(Date.now() + DAYS30)
    return EXPIRESIN;
}


module.exports = mongoose.model("Promo", promocodeSchema);