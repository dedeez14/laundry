const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    jenis: {
        type: String,
        required: true
    },
    berat_barang: {
        type: String,
        required: true
    },
    no_hp: {
        type: String,
        required: true
    },
})

customerSchema.statics.deleteById = async function(id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Customer', customerSchema)