const service = require('../services/service');
const schema=require('../validation/validationSchema')


async function showProduct(req, res) {
  try {
    const product = await service.getProduct();
    res.json(product);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to display product.' });
  }
}

async function productDetails(req,res) {
  try {
   const productId=req.params.productId
   const checkProduct= await service.Check(productId)
   if(!checkProduct){
     return res.json({ error: 'Product is not exsisted' });
    }
   const product=await service.productDetails(productId)
   console.log("updateed is done")
   res.json(product)
 }
   catch (error) {
   console.error('Error in controller:', error);
     res.json({ error: 'Failed to Show Product.' });
  }
 }


async function filterProduct(req, res) {
  cat=req.params.cat
  try {
    const product = await service.filterProduct(cat);
    res.json(product);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to display Product.' });
  }
}

async function createProduct(req,res){

  const { error, value } =schema.createProduct(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
    const newProduct=await service.addProduct(value)
    res.json(newProduct);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to create Product.' });
  }
}

async function deleteProduct(req,res) {
 try {
  const productId=req.params.productId
  const checkProduct= await service.Check(productId)
  if(!checkProduct){
    return res.json({ error: 'Product is not exsisted' });
  }
 const deleteProduct=await service.deleteProduct(productId)
  res.json(deleteProduct)
}
  catch (error) {
  console.error('Error in controller:', error);
    res.json({ error: 'Failed to delete Product.' });
 }
}

async function updateProduct(req,res) {

  const { error, value } =schema.createProduct(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
   const productId=req.params.productId
   const checkProduct= await service.Check(productId)
   if(!checkProduct){
     return res.json({ error: 'Product is not exsisted' });
    }
   await service.updateProduct(value,productId)
   console.log("updateed is done")
   res.json(value)
 }
   catch (error) {
   console.error('Error in controller:', error);
     res.json({ error: 'Failed to Update Product.' });
  }
 }


 //cart
 async function showCart(req, res) {
  try {
    const cart = await service.getCart();
    res.json(cart);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to display Cart.' });
  }
}

async function createCart(req,res){
  try {
    const newCart=await service.addCart()
    res.json(newCart);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to create Cart.' });
  }
}

async function addToCart(req,res) {
  try {
   const productId=req.params.productId
   const checkProduct= await service.Check(productId)
   if(!checkProduct){
     return res.json({ error: 'Product is not exsisted' });
    }
   await service.addToCart(productId)
   console.log("updateed is done")
   res.json("updateed is done")
 }
   catch (error) {
   console.error('Error in controller:', error);
  res.json({ error: 'Failed to Update Addto Cart.' });
  }
 }

//interaction
async function createInteraction(req,res) {

  const { error, value } =schema.createInteraction(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
   const productId=req.params.productId
   const checkProduct= await service.Check(productId)
   if(!checkProduct){
     return res.json({ error: 'Product is not exsisted' });
    }
   const interaction= await service.addInteraction(value,productId)
   res.json(interaction)
 }
   catch (error) {
   console.error('Error in controller:', error);
     res.json({ error: 'Failed to Create Interaction.' });
  }
 }

 async function deleteInteraction(req,res) {
  try {
   const interactionId=req.params.interactionId
   const checkProduct= await service.checkInteraction(interactionId)
   if(!checkProduct){
     return res.json({ error: 'Interaction is not exsisted' });
   }
  const deleteInteraction=await service.deleteInteraction(interactionId)
   res.json(deleteInteraction)
 }
   catch (error) {
   console.error('Error in controller:', error);
     res.json({ error: 'Failed to delete Interaction.' });
  }
 }

module.exports = {
  showProduct,
  productDetails,
  filterProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  showCart,
  createCart,
  addToCart,
  createInteraction,
  deleteInteraction,
};

