const express = require('express')
const router = express.Router()
const Pesanan = require('../models/pesananModel')
const faker = require('faker')

router.get('/', async (req, res) => {
    try {
        const pesanan_data = await Pesanan.find()
        res.json(pesanan_data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const hasil = await Pesanan.find({
        $or: [
          { pelanggan_id: { $regex: query, $options: 'i' } },
          { tanggal_pesanan: { $regex: query, $options: 'i' } },
          { status_pesanan: { $regex: query, $options: 'i' } }
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
        const ketemu = await Pesanan.find({pesanan_id: regex})
        res.json(ketemu)
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/delete_all', async (req, res) => {
    try {
        const hasil = await Pesanan.deleteMany({})
        res.json({message: `${hasil.deletedCount} data berhasil di hapus`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/:id', getData,(req, res) => {
    res.send(res.data.nama)
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await Pesanan.deleteById(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Data not found" });
        }
        
        res.json({ message: "Data Berhasil dihapus !" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', getData, async (req, res) => {
    if(req.body.tanggal_pesanan != null){
        res.data.tanggal_pesanan = req.body.tanggal_pesanan
    }

    if(req.body.status_pesanan != null){
        res.data.status_pesanan = req.body.status_pesanan
    }

    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const pesanan = new Pesanan({
        pelanggan_id: req.body.pelanggan_id,
        tanggal_pesanan: req.body.tanggal_pesanan,
        status_pesanan: req.body.status_pesanan
    })

    try {
        const newPesanan = await pesanan.save()
        res.status(201).json({
            message: "Data Berhasil di tambahkan",
            data: newPesanan
        })
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

async function getData(req, res, next){
    let data
    try {
        data = await Pesanan.findById(req.params.id)
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