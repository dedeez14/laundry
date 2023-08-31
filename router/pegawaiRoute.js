const express = require('express')
const router = express.Router()
const Pegawai = require('../models/pegawaiModel')
const faker = require('faker')

router.get('/', async (req, res) => {
    try {
        const pegawai_data = await Pegawai.find()
        res.json(pegawai_data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const hasil = await Pegawai.find({
        $or: [
          { nama: { $regex: query, $options: 'i' } },
          { alamat: { $regex: query, $options: 'i' } },
          { posisi: { $regex: query, $options: 'i' } }
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
        const ketemu = await Pegawai.find({nama: regex})
        res.json(ketemu)
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/generate_pegawai_data', async (req, res) => {
    try {
        const num = 10;
        for (let i = 0; i < num; i++) {
            const newPegawai = new Pegawai({
                nama: faker.name.findName(),
                alamat: faker.address.state(),
                posisi: faker.helpers.randomize(['Kasir','Staff Cuci','Driver'])
            })
            await newPegawai.save()
        }
        res.json({message: `${num} data pegawai berhasil terbuat`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/delete_all_pegawai', async (req, res) => {
    try {
        const hasil = await Pegawai.deleteMany({})
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
        
        const result = await Pegawai.deleteById(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Data not found" });
        }
        
        res.json({ message: "Data Berhasil dihapus !" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', getData, async (req, res) => {
    if(req.body.nama != null){
        res.data.nama = req.body.nama
    }

    if(req.body.alamat != null){
        res.data.alamat = req.body.alamat
    }

    if(req.body.posisi != null){
        res.data.posisi = req.body.posisi
    }

    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const pegawai = new Pegawai({
        nama: req.body.nama,
        alamat: req.body.alamat,
        posisi: req.body.posisi
    })

    try {
        const newCustomer = await pegawai.save()
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
        data = await Pegawai.findById(req.params.id)
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