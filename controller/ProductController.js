const pool = require('../db/db');

exports.products_delete_product = async (req, res, next) => {
  try {  
    const id = req.params.id;
    const results = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(201).send("TODO was deleted!!! Successfully", results);
  }
  catch(error){
    res.sendStatus(404).send(error.message);
  }
};

exports.products_get_all = async (req, res) => {
  try{
    let {category, page, size} = req.query;
  
    if (!page) {
    page = 1;
  }
    
    if (!size) {
      size = 2;
    }

    if (!category){
      res.send({
        page,
        size,
        data: (await pool.query("SELECT * FROM products ORDER BY products.id LIMIT $2 OFFSET (($1 - 1) * $2)", [page, size])).rows,
      });
    }
    else {
      res.send({
        page,
        size,
        data: await pool.query("SELECT * FROM products WHERE category = $3 ORDER BY products.id LIMIT $2 OFFSET (($1 - 1) * $2)", [page, size, category]).rows,
      });
    }
  }
  catch (error) {
    res.sendStatus(500).send(`Something went wrong while fetching ==> ${error.message}`);
  }
};

exports.products_get_product = async (request, res) => {
  try {  
    console.log("PostGREsql get product :id/ page accessed");
    const id = request.params.id;
    console.log(id);
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    res.send(result.rows);
  }
  catch (error) {
    res.sendStatus(500).send(error.message);
  }
};

exports.products_create_product = async (req, res, then) => {
  try {
    const category = req.body.category;
    const name = req.body.name;
    const price = req.body.price;
    const img_src = req.body.img_src;
    console.log(category, name, price, img_src);
    const result = await pool.query("INSERT into products (category, name, price, img_src) VALUES($1, $2, $3, $4) RETURNING *", [category, name, price, img_src]);
    res.send(result.rows[0]);
  } catch(e) {
    res.status(400)
    res.send(`Something went wrong while saving ==> ${e}`)
  }

  };