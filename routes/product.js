const express = require('express');
const router = express.Router();

const ProductsController = require('../controller/ProductController');

router.get("/", ProductsController.products_get_all);

router.post("/addProduct", ProductsController.products_create_product);

router.get("/:id", ProductsController.products_get_product);

router.delete("/:id", ProductsController.products_delete_product);

module.exports = router;