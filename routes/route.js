const express= require('express')
const router = express.Router();
const controller=require('../controller/controllers.js')

router.get("/products",controller.showProduct)
router.get("/product/:productId",controller.productDetails)
router.get("/products/:filter",controller.filterProduct)
router.post('/create',controller.createProduct);
router.delete("/delete/:productId",controller.deleteProduct)
router.patch("/update/:productId",controller.updateProduct)
//proCart
router.get("/procarts",controller.showProCart)
router.post('/createprocart/:productId',controller.addProCart);
router.delete("/deleteprocart/:proCartId",controller.deleteProCart)
router.patch("/updateprocart/:proCartId",controller.updateProCart)
//cart
router.get("/carts",controller.showCart)
router.post('/createcart',controller.createCart);
//interaction
router.post('/createinteraction/:productId',controller.createInteraction);
router.delete("/deleteinteraction/:interactionId",controller.deleteInteraction)

module.exports = router;

