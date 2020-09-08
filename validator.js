// const productModel = require('./model/productModel')

// const productDataCheck = (name, quantity) => {
//   switch (true) {
//     case name.length < 5:
//       return {
//         code: 'invalid_data',
//         message: '\"\name\" length must be at least 5 characters long'
//       };
//     case quantity < 1:
//       return {
//         code: 'invalid_data',
//         message: '\"\quantity\" must be larger than or equal to 1'
//       };
//     case isNaN(quantity):
//       return {
//         code: 'invalid_data',
//         message: '\"\quantity\" must be a number'
//       };
//     default:
//       console.log('Teste');
//       return productModel.create(name, quantity);
//   };
// }

// module.exports = { productDataCheck };
