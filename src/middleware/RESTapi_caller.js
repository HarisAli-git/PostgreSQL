import axios from "axios"

function FetchProdPaginateMongo(value, page, size) {
    console.log("category: ", value, "Page: ", page, "size: ", size);
    if (value !== -1)
    {
        const param = "category=" + value + "&page=" + page + "&size=" + size;
        return axios({ method: "GET", url: "http://localhost:5000/products?" + param}); 
    }
    else{
        const param = "page=" + page + "&size=" + size;
        return axios({ method: "GET", url: "http://localhost:5000/products?" + param});
    }
}


function Fetch_prod_Mongo() {
    return axios({ method: "GET", url: "http://localhost:5000/products"});
}

function Fetch_cat_Mongo(param) {
    return axios({ method: "GET", url: "http://localhost:5000/categories/" });
}

function Fetch_Product_Mongo(id) {
    return axios({ method: "GET", url: "http://localhost:5000/products/" + id });
}

function Delete_Product_Mongo(id) {
    return axios({ method: "DELETE", url: "http://localhost:5000/products/" + id });
}

function Post_SignUpCatMongo(param)
{
    const category = { name: param.name};

    return axios({
        method: "POST", url: "http://localhost:5000/categories/addCategory/",
        data: category
    });
}

function Post_SignUpMongo(param) {

    const product = { category: param.category, name: param.name, price: param.price, img_src: param.img_src};

    return axios({
        method: "POST", url: "http://localhost:5000/products/addProduct/",
        data: product
    });
}

export {FetchProdPaginateMongo, Post_SignUpMongo, Post_SignUpCatMongo, Fetch_prod_Mongo, Fetch_cat_Mongo, Fetch_Product_Mongo, Delete_Product_Mongo};