const express = require('express')
const router = express.Router()
const itemLaundry = require('../models/itemLaundryModel')
const faker = require('faker')

router.get('/', async (req, res) => {
    try {
        const item_data = await itemLaundry.find()
        res.json(item_data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const hasil = await itemLaundry.find({
        $or: [
          { nama_item: { $regex: query, $options: 'i' } },
          { jenis_item: { $regex: query, $options: 'i' } },
          { harga_per_item: { $regex: query, $options: 'i' } }
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
        const ketemu = await itemLaundry.find({nama_pelanggan: regex})
        res.json(ketemu)
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/delete_all', async (req, res) => {
    try {
        const hasil = await itemLaundry.deleteMany({})
        res.json({message: `${hasil.deletedCount} data berhasil di hapus`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/:id', getData,(req, res) => {
    const data = [{
        nama_item: res.data.nama_item,
        jenis_item: res.data.jenis_item,
        harga_per_item: res.data.harga_per_item
    }]

    res.send(data)
})

router.post('/generate_item', async (req, res) => {
    try {
        const num = 10;
        for (let i = 0; i < num; i++) {
            const newItem = new itemLaundry({
                nama_item: faker.commerce.productName(),
                jenis_item: faker.random.arrayElement(['Pakaian', 'Sepatu', 'Selimut', 'Tas']),
                harga_per_item: faker.datatype.number({ min: 5, max: 50, precision: 0.01 })
            })
            await newItem.save()
        }
        res.json({message: `${num} data item berhasil terbuat`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await itemLaundry.deleteById(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Data not found" });
        }
        
        res.json({ message: "Data Berhasil dihapus !" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', getData, async (req, res) => {
    if(req.body.nama_item != null){
        res.data.nama_item = req.body.nama_item
    }

    if(req.body.jenis_item != null){
        res.data.jenis_item = req.body.jenis_item
    }

    if(req.body.harga_per_item != null){
        res.data.harga_per_item = req.body.harga_per_item
    }

    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const item = new itemLaundry({
        nama_item: req.body.nama_item,
        jenis_item: req.body.jenis_item,
        harga_per_item: req.body.harga_per_item
    })

    try {
        const newItem = await item.save()
        res.status(201).json({
            message: "Data Berhasil di tambahkan",
            data: newItem
        })
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

async function getData(req, res, next){
    let data
    try {
        data = await itemLaundry.findById(req.params.id)
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