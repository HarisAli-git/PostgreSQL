const pool = require('../db/db');

exports.categories_get_all = async (req, res) => {
    console.log("/POSTgre SQL get_categories page accessed");
    const result = await pool.query("SELECT * from categories");
    res.send(result.rows);
  }; 

exports.categories_add_category = async (req, res, next) => {
   try {
    const name = req.body.name;
    const result = await pool.query("INSERT into categories (name) VALUES($1) RETURNING *", [name])
    res.send(result.rows); 
   } catch (error) {
     console.log(error.message);
   }
  };  