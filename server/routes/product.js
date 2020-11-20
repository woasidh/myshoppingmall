const express = require('express');
const router = express.Router();
const multer = require('multer')
const { Product } = require('../models/Product')

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        } else {
            return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        }
    })
})

router.post('/', (req, res) => {
    const product = new Product(req.body)

    product.save((err) => {
        if (err)
            return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.get('/products_by_id', (req, res) => {

    let productIds = req.query.id
    let type = req.query.type

    if(type==='array'){
        productIds = req.query.id.split(',')
    }

    Product.find({_id: {$in: productIds}})
    .populate("writer")
    .exec((err, product)=>{
        if(err)
        res.status(400).send(err)
        res.status(200).send(product)
    })
    

})

router.post('/products', (req, res) => {
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let limit = req.body.limit ? parseInt(req.body.limit) : 20
    let search = req.body.searchTerm

    findArgs = {};
    for (let key in req.body.filter) {
        if (req.body.filter[key] > 0) {
            findArgs[key] = req.body.filter[key];
        }
    }

    if (search) {
        Product
            .find(findArgs)
            .find({ $text: { $search: search } })
            .skip(skip)
            .limit(limit)
            .exec((err, productinfo) => {
                if (err) {
                    res.status(400).json({ success: false, err })
                }
                res.status(200).json({ success: true, productinfo })
            })
    } else {
        Product
            .find(findArgs)
            .skip(skip)
            .limit(limit)
            .exec((err, productinfo) => {
                if (err) {
                    res.status(400).json({ success: false, err })
                }
                res.status(200).json({ success: true, productinfo })
            })
    }

})

module.exports = router;
