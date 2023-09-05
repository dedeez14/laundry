const Pesanan = require('./pesananModel');
const ItemLaundry = require('./itemLaundryModel');

const LaundryModel = {
  findPesananByPelangganId: async (pelangganId) => {
    try {
      const pesanan = await Pesanan.find({ pelangganId }).populate('pelangganId').populate('items.itemLaundryId');
      return pesanan;
    } catch (error) {
      throw error;
    }
  },

  findAllItemLaundry: async () => {
    try {
      const items = await ItemLaundry.find();
      return items;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = LaundryModel;
