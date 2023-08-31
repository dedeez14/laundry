const express = require('express')
const router = express.Router()
const Customer = require('../models/customerModel')
const faker = require('faker')

router.get('/', async (req, res) => {
    try {
        const customer_data = await Customer.find()
        res.json(customer_data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
      const hasil = await Customer.find({
        $or: [
          { nama: { $regex: query, $options: 'i' } },
          { jenis: { $regex: query, $options: 'i' } },
          { berat_barang: { $regex: query, $options: 'i' } },
          { no_hp: { $regex: query, $options: 'i' } }
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
        const ketemu = await Customer.find({nama: regex})
        res.json(ketemu)
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/generate_customer_data', async (req, res) => {
    try {
        const num = 10;
        for (let i = 0; i < num; i++) {
            const newCustomer = new Customer({
                nama: faker.name.findName(),
                jenis: faker.helpers.randomize(['Katun','Lepis']),
                berat_barang: faker.helpers.randomize(['1KG','5KG','10KG','15KG','20KG']),
                no_hp: faker.phone.number('+62 ###-####-####')
            })
            await newCustomer.save()
        }
        res.json({message: `${num} data customer berhasil terbuat`})
    } catch(err){
        res.status(500).json({err: err.message})
    }
})

router.get('/delete_all_laundry', async (req, res) => {
    try {
        const hasil = await Customer.deleteMany({})
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
        
        const result = await Customer.deleteById(id);
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

    if(req.body.berat_barang != null){
        res.data.berat_barang = req.body.berat_barang
    }

    if(req.body.no_hp != null){
        res.data.no_hp = req.body.no_hp
    }

    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const customer = new Customer({
        nama: req.body.nama,
        jenis: req.body.jenis,
        berat_barang: req.body.berat_barang,
        no_hp: req.body.no_hp
    })

    try {
        const newCustomer = await customer.save()
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
        data = await Customer.findById(req.params.id)
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