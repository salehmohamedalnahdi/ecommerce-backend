const {PrismaClient}=require ('@prisma/client');
const prisma=new PrismaClient();

async function getProduct() {
  const product = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc' // or 'asc' for descending order
    }
  })
    return product;  
}

async function productDetails(productId) {
  const product = await prisma.product.findMany({
    where: {id: parseInt(productId)},
    include: {
      interactions: {
        orderBy: {
          createdAt: 'desc' 
        }
      }
    }
  })
  return product;  
}

async function filterProduct(filter) {
  const product = await prisma.product.findMany({
    where: {
      /*cat:  {
              contains: cat,
              mode: 'insensitive'
            }*/
              OR: [
                { cat: { contains: filter, mode: 'insensitive' } },
                { name: { contains: filter, mode: 'insensitive' } },
                { desc: { contains: filter, mode: 'insensitive' } }
              ]
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

//proCart
async function getProCart() {
  const proCart = await prisma.pro_cart.findMany({
    where: {cartId: 3 },
    include: { products: true },
  })
    return proCart;  
}

async function addProCart(productId){
 // const productIndex =await prisma.pro_cart.products.findIndex((product) => product.id === productId)
  const cartId= 3 
  const proCart = await prisma.pro_cart.findFirst({
    where: {
      cartId: parseInt(cartId),
      //products: { id: parseInt(productId) } ,
      products: {some: { id: parseInt(productId) }}
      
    },
  });

  if (proCart) {
    // Product already exists in the cart
    console.log('Product already exists in the cart');
    return {Error: "Product already exists in the cart"} ;
  }

  const newProCart = await prisma.pro_cart.create({
    data: {
      products: { connect: { id: parseInt(productId) } },
      carts: { connect: { id: parseInt(cartId) } }
    },
  });
 return(newProCart);
}

async function deleteProCart(proCartId){
  const proCart=await prisma.pro_cart.delete({
    where: { id: parseInt(proCartId) },
  });
 return proCart;
}

async function checkProCart(proCartId) {
  const checkProCart=await prisma.pro_cart.findUnique({
    where: { id: parseInt(proCartId) }
  })
  return checkProCart;
}

async function updateProCart(requestBody,proCartId) {
  const product= await prisma.pro_cart.updateMany({
    where: { id: parseInt(proCartId)},
    data:{
      qu:requestBody.qu,
    }
  })
  return product;
}


//cart
async function getCart() {
  const cart = await prisma.cart.findMany({
   // where : {pro_carts: {some : {id: 2}}},
    include: { pro_carts: true },
  })
    return cart;  
}

async function addCart(){ 
  const newCart = await prisma.cart.create();
  return(newCart);
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
  getProCart,
  addProCart,
  deleteProCart,
  checkProCart,
  updateProCart,
  getCart,
  addCart,
  checkCart,
  addInteraction,
  deleteInteraction,
  checkInteraction,
};


