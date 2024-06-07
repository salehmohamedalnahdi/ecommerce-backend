const express= require('express')
const router = express.Router();
const controller=require('../controller/controllers.js')

router.get("/products",controller.showProduct)
router.get("/product/:productId",controller.productDetails)
router.get("/products/:cat",controller.filterProduct)
router.post('/create',controller.createProduct);
router.delete("/delete/:productId",controller.deleteProduct)
router.patch("/update/:productId",controller.updateProduct)
//cart
router.get("/carts",controller.showCart)
router.post('/createcart',controller.createCart);
router.patch("/carts/:productId",controller.updateProduct)
//interaction
router.post('/createinteraction/:productId',controller.createInteraction);
router.delete("/deleteinteraction/:interactionId",controller.deleteInteraction)

module.exports = router;

