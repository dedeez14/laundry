const mongoose = require('mongoose')

const laundrySchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    jenis: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    jam_masuk: {
        type: String,
        required: false,
        default: Date.now
    }
})

laundrySchema.statics.deleteById = async function(id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Laundry', laundrySchema)