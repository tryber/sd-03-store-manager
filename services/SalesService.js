const { salesModel, productsModel } = require('../models');
const invalid = 'invalid_data';
let code;
let message;
const stock_error ='stock_problem';



const validateSaleCreate = async ({productId, quantity} ) => {
   return quantity >= 1 && typeof quantity === 'number' && productId.length === 24;
};

const saleCreate = async (products) => {
    let validation ;
    products.forEach((product) => {    
    validation = validateSaleCreate(product);
    if(!validation) {
        code = invalid;
        message = 'Wrong product ID or invalid quantity';
        return { err: { code, message } };
        }
    
        if (validation) {
              products.forEach(async ({productId, quantity }) => {
               if(productId !== undefined ) {
                const product = await productsModel.productId(productId);
              const stock = product.quantity;
               }

        if (!product) 
            { 
             code = invalid;
             message = 'Wrong product ID or invalid quantity';
             return { err: { code, message } };
         }
        
        if (quantity > stock) {
            code = stock_error;
            message = 'Wrong product ID or invalid quantity';
            return { err: { code, message } };
            }
        });
     }
    })    
}


module.exports = {
    saleCreate,
}