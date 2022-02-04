const pool = require('/home/oem/Desktop/haris/PERN/postgre/db/db.js');

exports.getAllpools = async () => {
    const results = await pool.find()
    return results
}

exports.getOnepools = async (id) => {
    const results = await pool.findById(id);
    return results
}

exports.getpoolsPaginate = async (limit, skip) => {
    console.log(limit, skip);
    const results = await pool.query("SELECT * FROM products ORDER BY products.id LIMIT $2 OFFSET (($1 - 1) * $2", []);
    console.log(results);
    return results
}
// exports.getAllpools = async () => {
//     const results = await pool.find()
//     return results
// }