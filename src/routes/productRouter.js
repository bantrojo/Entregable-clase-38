const express = require('express');
const router = express.Router();
const productManager = require('../Manager/productManager.js')
const productService = new productManager();

let products = [];

//router actions
router.get('/products', (req, res) => {
    return productService.get(products).then((result) => res.send(result));
})

router.post('/products', (req, res) => {
    
    let product = req.body;
    productService.add(product).then((result) => console.log(result))
    res.send({ message: "Product created" });

})

router.delete('/products/:num', (req, res) => {
    if (admin == true) {
        try {
            let param = req.params.num;
            let id = parseInt(param);
            product.splice(id - 1, 1);
            res.json({ products })
        } catch (error) {
            return { status: "error", error: error }
        }
    }

})



module.exports = router;
//al exportar router no es productRouter, sie per router