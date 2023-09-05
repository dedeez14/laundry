const mongoose = require('mongoose')

const itemLaundrySchema = new mongoose.Schema({
    nama_item: {
        type: String,
        required: true
    },
    jenis_item: {
        type: String,
        required: true
    },
    harga_per_item: {
        type: String,
        required: true
    },
})

itemLaundrySchema.statics.deleteById = async function(id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('ItemLaundry', itemLaundrySchema)