const mongoose = require('mongoose')

const detailPesananSchema = new mongoose.Schema({
    pesanan_id: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    jumlah_item: {
        type: String,
        required: true
    },
})

detailPesananSchema.statics.deleteById = async function(id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('detailPesanan', detailPesananSchema)