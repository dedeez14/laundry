const mongoose = require('mongoose')

const pelangganSchema = new mongoose.Schema({
    nama_pelanggan: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    nomor_telpon: {
        type: String,
        required: true
    },
})

pelangganSchema.statics.deleteById = async function(id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('pelanggan', pelangganSchema)