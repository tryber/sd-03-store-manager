// SERVICE: Valida as regras de negócio enviando apenas os dados necessários para o model!
const { createProduct,
  removeProduct,
  getAllProducts,
  getProductsById,
  getProductsByName,
  updateProduct } = require('../models/productsModel');

function ValidadeProduct(name, quantity, duplicate) {
  switch (true) {
    case (!name || typeof name !== 'string' || name.length < 5):
      return { error: true, message: '"name" length must be at least 5 characters long' };
    case (!quantity || quantity < 1):
      return { error: true, message: '"quantity" must be larger than or equal to 1' };
    case (typeof quantity !== 'number'):
      return { error: true, message: '"quantity" must be a number' };
    case (duplicate && duplicate.name === name):
      return { error: true, message: 'Product already exists' };
    default:
      return { error: false };
  }
}

const CreateProduct = async (name, quantity) => {
  const duplicate = await getProductsByName(name);
  const validation = ValidadeProduct(name, quantity, duplicate);
  if (validation.error) return validation;
  const createdProduct = await createProduct(name, quantity);
  return { error: false, message: 'Usuário criado com sucesso!', createdProduct };
};

const ReturnProducts = async (id) => {
  if (!id) {
    const products = await getAllProducts();
    return products;
  }
  const product = await getProductsById(id);
  return product;
};

const UpdateProduct = async (id, name, quantity) => {
  const validation = ValidadeProduct(name, quantity);
  if (validation.error) return validation;
  const updatedProduct = await updateProduct(id, name, quantity);
  return { error: false, message: 'Usuário atualizado com sucesso!', updatedProduct };
};

const DeleteProduct = async (id) => {
  const product = ReturnProducts(id);
  if (!product) return { error: true, message: 'Not Found' };
  await removeProduct(id);
  return { error: false, message: 'Usuário apagado!', product };
};

module.exports = {
  CreateProduct,
  DeleteProduct,
  ReturnProducts,
  UpdateProduct,
};
