const express = require('express')
const router = express.Router()
const Pelanggan = require('../models/pelangganModel')
const faker = require('faker')

router.get('/', async (req, res) => {
    try {
        const pelanggan_data = await Pelanggan.find()
        res.json(pelanggan_data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const hasil = await Pelanggan.find({
        $or: [
          { nama_pelanggan: { $regex: query, $options: 'i' } },
          { alamat: { $regex: query, $options: 'i' } },
          { nomor_telpon: { $regex: query, $options: 'i' } }
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
        const ketemu = await Pelanggan.find({nama_pelanggan: regex})
        res.json(ketemu)
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/generate_pelanggan', async (req, res) => {
    try {
        const num = 10;
        for (let i = 0; i < num; i++) {
            const newPelanggan = new Pelanggan({
                nama_pelanggan: faker.name.findName(),
                alamat: faker.address.state(),
                nomor_telpon: faker.phone.number('+62 ###-####-####')
            })
            await newPelanggan.save()
        }
        res.json({message: `${num} data pelanggan berhasil terbuat`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/delete_all', async (req, res) => {
    try {
        const hasil = await Pelanggan.deleteMany({})
        res.json({message: `${hasil.deletedCount} data berhasil di hapus`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/:id', getData,(req, res) => {
    const data = {
        nama:res.data.nama_pelanggan,
        alamat:res.data.alamat,
        nomor_telpon:res.data.nomor_telpon
    }
    res.send(data)
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await Pelanggan.deleteById(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Data not found" });
        }
        
        res.json({ message: "Data Berhasil dihapus !" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', getData, async (req, res) => {
    if(req.body.nama_pelanggan != null){
        res.data.nama_pelanggan = req.body.nama_pelanggan
    }

    if(req.body.alamat != null){
        res.data.alamat = req.body.alamat
    }

    if(req.body.nomor_telpon != null){
        res.data.nomor_telpon = req.body.nomor_telpon
    }

    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const pelanggan = new Pelanggan({
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        nomor_telpon: req.body.nomor_telpon
    })

    try {
        const newPelanggan = await pelanggan.save()
        res.status(201).json({
            message: "Data Berhasil di tambahkan",
            data: newPelanggan
        })
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

async function getData(req, res, next){
    let data
    try {
        data = await Pelanggan.findById(req.params.id)
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