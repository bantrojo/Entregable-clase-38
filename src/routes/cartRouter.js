const express = require('express');
const router = express.Router();
const cartManager = require('../Manager/cartManager');

const cartService = new cartManager();
let carts = [];

//router actions
//devulve carrito
router.get('/cart/:id/products', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const getAll = await cartService.getProduct(id)
        return res.json({ getAll });
    } catch (error) {
        return { status: false, error }
    }
});

//crea carrito vacio
router.post('/cart', async (req, res) => {
    try {

        const newCartId = await cartService.addNewCart();
        return res.status(201).json({ status: true, newCartId });
    } catch (error) {
        return res.status(500).json({ status: false, error });
    }
})



router.delete('/cart/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const del = await cartService.deleteCart(id)
    res.json({ status: true, message: "deleted" })
})

router.post('/cart/:id/products/:idProduct', async (req, res) => {
    const id = parseInt(req.params.id);
    const idProduct = parseInt(req.params.idProduct);
    try {
        const addPro = await cartService.addProduct(id, idProduct)
        return res.json({ status: true, addPro })

    } catch (error) {
        return res.json({ status: false, error })

    }

})


router.delete('/cart/:id/products/:idProduct', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const idProduct = parseInt(req.params.idProduct);
        const deleteProdut = await cartService.deleteProduct(id, idProduct);
        return res.json({ status: true, deleteProdut });


    } catch (error) {
        throw error;
    }


})






//export
module.exports = router;