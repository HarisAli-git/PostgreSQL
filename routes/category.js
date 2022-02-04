const express = require('express');
const router = express.Router();

const CategoriesController = require('../controller/CategoryController');

router.get("/", CategoriesController.categories_get_all);

router.post("/addCategory", CategoriesController.categories_add_category);

module.exports = router;