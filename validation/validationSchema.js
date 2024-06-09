const Joi = require('joi');


const createProduct=(requestBody)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string(),
        price: Joi.number().required(),
        image: Joi.string(),
        cat: Joi.string().required(),
      });
      return schema.validate(requestBody)
}


const createInteraction=(requestBody)=>{
  const schema = Joi.object({
      comment: Joi.string().required(),
      rate: Joi.number().required(),
    });
    return schema.validate(requestBody)
}

const updateProCart=(requestBody)=>{
  const schema = Joi.object({
      qu: Joi.number().min(1).required(),
    });
    return schema.validate(requestBody)
}
module.exports={createProduct,createInteraction,updateProCart}
