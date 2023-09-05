const mongoose = require('mongoose')

const pesananSchema = new mongoose.Schema({
    pelanggan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pelanggan',
      required: true,
    },
    tanggal_pesanan: {
      type: Date,
      required: true,
    },
    status_pesanan: {
      type: String,
      required: true,
    },
    items: [
      {
        itemLaundry: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ItemLaundry',
          required: true,
        },
        jumlah_item: {
          type: Number,
          required: true,
        },
      },
    ],
  });

pesananSchema.statics.deleteById = async function(id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Pesanan', pesananSchema)