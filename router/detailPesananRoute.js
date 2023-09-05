const express = require('express')
const router = express.Router()
const detailPesanan = require('../models/detailPesananModel')
const faker = require('faker')

router.get('/', async (req, res) => {
    try {
        const detail_data = await detailPesanan.find()
        res.json(detail_data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const hasil = await detailPesanan.find({
        $or: [
          { detail_id: { $regex: query, $options: 'i' } },
          { pesanan_id: { $regex: query, $options: 'i' } },
          { item_id: { $regex: query, $options: 'i' } },
          { jumlah_item: { $regex: query, $options: 'i' } }
        ]
      });
      res.json(hasil);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

router.get('/filter/:query', async (req, res) => {
    const { query } = req.params
    try {
        const regex = new RegExp(query, 'i')
        const ketemu = await detailPesanan.find({detail_id: regex})
        res.json(ketemu)
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/delete_all', async (req, res) => {
    try {
        const hasil = await detailPesanan.deleteMany({})
        res.json({message: `${hasil.deletedCount} data berhasil di hapus`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/:id', getData,(req, res) => {
    const data = [{
        pesanan_id: res.data.pesanan_id,
        item_id: res.data.item_id
    }]
    res.send(data)
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await detailPesanan.deleteById(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Data not found" });
        }
        
        res.json({ message: "Data Berhasil dihapus !" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', getData, async (req, res) => {
    if(req.body.jumlah_item != null){
        res.data.jumlah_item = req.body.jumlah_item
    }

    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const detailPesan = new detailPesanan({
        pesanan_id: req.body.pesanan_id,
        item_id: req.body.item_id,
        jumlah_item: req.body.jumlah_item
    })

    try {
        const newCustomer = await detailPesan.save()
        res.status(201).json({
            message: "Data Berhasil di tambahkan",
            data: newCustomer
        })
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

async function getData(req, res, next){
    let data
    try {
        data = await detailPesanan.findById(req.params.id)
        if(data == null){
            return res.status(404).json({message: "Tidak menemukan data"})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.data = data
    next()
}


module.exports = router