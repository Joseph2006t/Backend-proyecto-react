import express from 'express';
/*
import * as productController from './controllers/productController.mjs'
*/
import * as UsuarioController from './controller/UsuarioController.mjs'

const router = express.Router();

/*
router.get('/products', productController.getAllProducts)
router.put('/products/:id',productController.updateProduct)
router.post('/product-create',productController.createProduct)
router.delete('/products/:id', productController.deleteProduct);
*/
router.post('/registro', UsuarioController.createUser);
router.post('/login', UsuarioController.login);


export default router;