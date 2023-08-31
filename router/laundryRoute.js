const express = require('express')
const router = express.Router()
const Laundry = require('../models/laundryModel')
const faker = require('faker')

router.get('/', async (req, res) => {
    try {
        const laundry_data = await Laundry.find()
        res.json(laundry_data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const hasil = await Laundry.find({
        $or: [
          { nama: { $regex: query, $options: 'i' } },
          { jenis: { $regex: query, $options: 'i' } },
          { type: { $regex: query, $options: 'i' } }
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
        const ketemu = await Laundry.find({nama: regex})
        res.json(ketemu)
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/generate_laundry_data', async (req, res) => {
    try {
        const num = 10;
        for (let i = 0; i < num; i++) {
            const newLaundry = new Laundry({
                nama: faker.name.findName(),
                jenis: faker.helpers.randomize(['Katun','Lepis']),
                type: faker.helpers.randomize(['Celana','Baju'])
            })
            await newLaundry.save()
        }
        res.json({message: `${num} data laundry berhasil terbuat`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/delete_all_laundry', async (req, res) => {
    try {
        const hasil = await Laundry.deleteMany({})
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
        
        const result = await Laundry.deleteById(id);
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

    if(req.body.jenis != null){
        res.data.jenis = req.body.jenis
    }

    if(req.body.type != null){
        res.data.type = req.body.type
    }

    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const laundry = new Laundry({
        nama: req.body.nama,
        jenis: req.body.jenis,
        type: req.body.type
    })

    try {
        const newCustomer = await laundry.save()
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
        data = await Laundry.findById(req.params.id)
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