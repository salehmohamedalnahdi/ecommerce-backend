const {PrismaClient}=require ('@prisma/client');
const prisma=new PrismaClient();

async function getProduct() {
  const product = await prisma.product.findMany()
    return product;  
}

async function productDetails(productId) {
  const product = await prisma.product.findMany({
    where: {id: parseInt(productId)},
    include: {
      interactions: true
    }
  })
  return product;  
}

async function filterProduct(cat) {
  const product = await prisma.product.findMany({
    where: {
      cat:  {
              contains: cat,
              mode: 'insensitive'
            }
    },
    include: {
      interactions: true
    }
  })
  return product;  
}

async function addProduct(requestBody){ 
  const newProduct = await prisma.product.create({
    data: {
      name:requestBody.name,
      desc: requestBody.desc,
      price:requestBody.price,
      cat:requestBody.cat,
      image:requestBody.image,
    },
  });
  return(newProduct);
}

async function Check(productId) {
  const checkProduct=await prisma.product.findUnique({
    where: { id: parseInt(productId) }
  })
  return checkProduct;
}


async function deleteProduct(productId){
   const product=await prisma.product.delete({ 
    where: { id: parseInt(productId)}
  });
  return product;
}

async function updateProduct(requestBody,productId) {
  const product= await prisma.product.updateMany({
    where: { id: parseInt(productId)},
    data:{
      name:requestBody.name,
      desc: requestBody.desc,
      price:requestBody.price,
      cat:requestBody.cat,
      image:requestBody.image,
    }
  })
  return product;
}

//cart
async function getCart() {
  const cart = await prisma.cart.findMany({
    include: { products: true },
  })
    return cart;  
}

async function addCart(){ 
  const newCart = await prisma.cart.create();
  return(newCart);
}

async function addToCart(productId) {
  const addToCart = await prisma.cart.update({
    where: { id:2 },
    data: {
      products: {
        connect: { id: parseInt(productId) },
      },
    },
    include: { products: true },
  });
  return addToCart;
}

async function checkCart(cartId) {
  const checkCart=await prisma.cart.findUnique({
    where: { id: parseInt(cartId) }
  })
  return checkCart;
}

//interaction
async function addInteraction(requestBody,productId){ 
  const newInteraction = await prisma.interaction.create({
    data: {
      comment:requestBody.comment,
      rate: requestBody.rate,
      interactionId: parseInt(productId)
    }
  }
  );
  return(newInteraction);
}

async function deleteInteraction(interactionId){
  const interaction=await prisma.interaction.delete({ 
   where: { id: interactionId}
 });
 return interaction;
}

async function checkInteraction(interactionId) {
  const checkInteraction=await prisma.interaction.findUnique({
    where: { id: interactionId }
  })
  return checkInteraction;
}

module.exports = {
  getProduct,
  productDetails,
  filterProduct,
  addProduct,
  Check,
  deleteProduct,
  updateProduct,
  getCart,
  addCart,
  addToCart,
  checkCart,
  addInteraction,
  deleteInteraction,
  checkInteraction,
};



/* async function getUsersWithAchievements(userId) {
  try {
    const users = await prisma.user.findMany({
      where: { id: userId },
      include: { achievements: true }
    });
    return users;
  } catch (error) {
    console.error('Error displaying portfolio:', error);
    throw new Error('Failed to display portfolio.');
  }
}*/

/*async function deletePortfolio(req,res) {
 try {
  const {email}=req.body
  try {
    const checkUser=await prisma.user.findMany({
      where: { email: email }
    })
  } catch (error) {
    console.error('Error in checkUser controller:', error);
     res.json({ error: 'email is not exsisted' });
  }
  const deleteaAhievement=await prisma.achievement.deleteMany({
    where: { userEmail: email }
   });
  const deleteUser=await prisma.user.delete({ 
    where: { email: email }
  });
  res.json(deleteUser)
}
  catch (error) {
  console.error('Error in user controller:', error);
    res.json({ error: 'Failed to delete portfolio.' });
 }
}*/

/*async function updatePortfolio(req,res) {
  try {
   const {name, email, age ,title,content}=req.body
   try {
    const checkUser=await prisma.user.findMany({
      where: { email: email }
     })
   } catch (error) {
    console.error('Error in checkUser controller:', error);
    res.json({ error: 'email is not exsisted' });
   }
   const updateUser=await prisma.user.updateMany({
    where: { email: email },
    data:{
      name,
      age,
    },
  });
  const updateachievement=await prisma.achievement.updateMany({
   where: { userEmail: email },
   data:{
     title,
     content,
   }
 })
 res.json({message:"updateed is done"})
}
  catch (error) {
  console.error('Error in user controller:', error);
    res.status(500).json({ error: 'Failed to Update portfolio.' });
 }
}*/