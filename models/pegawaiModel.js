const mongoose = require('mongoose')

const pegawaiSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    posisi: {
        type: String,
        required: true
    }
})

pegawaiSchema.statics.deleteById = async function(id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('pegawai', pegawaiSchema)