const express = require('express');
const router = express.Router();
const LaundryModel = require('../models/laundryModel'); // Sesuaikan dengan path file yang benar

// Route untuk mencari pesanan berdasarkan ID pelanggan
router.get('/:pelangganId', async (req, res) => {
  try {
    const { pelangganId } = req.params;
    const pesanan = await LaundryModel.findPesananByPelangganId(pelangganId);
    res.json(pesanan);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Route untuk menampilkan semua item laundry
router.get('/item_laundry', async (req, res) => {
  try {
    const items = await LaundryModel.findAllItemLaundry();
    res.json(items);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
