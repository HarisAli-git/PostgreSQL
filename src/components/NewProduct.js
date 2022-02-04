import { useEffect, useState} from "react";
import { Post_SignUpMongo, Fetch_cat_Mongo } from "../middleware/RESTapi_caller";
import { Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom"

const NewProduct = () => {

    const [product, setProduct] = useState({})
    const [isPending, setIsPending] = useState(false);
    const [categories, setCategories] = useState([]);
    const [alert, setAlert] = useState(' ');
    const [flag, setFlag] = useState(false);

    const FetchCategories = async (e) => {
      const resp = await Fetch_cat_Mongo()
      setCategories(resp.data)
    }

    useEffect(() => {
        console.log("Mongo Categories_Mounted!!!");
        FetchCategories();
    }, []);

    const isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    }

    const checkValidation = (params) => {
        console.log("Here the Params for Validation: ", params)
        
        if (isEmptyOrSpaces(params.name)) {
            return false;
        }
        if (typeof params.category === 'undefined') {
            return false;
        }    
        return true;    
    }

    const setValue = (name, value) => {
      setProduct({ ...product, [name]: value }) 
    }


    const submitForm = async (e) => {
        e.preventDefault();
        setIsPending(true);

        setAlert(' ');

        if (checkValidation(product))
        {
            setAlert(<Alert variant="success">
                Product Successfully Added!
            </Alert>)
            const res = await Post_SignUpMongo(product);
            setFlag(true);
            setIsPending(false);
            console.log(res);
        }
        else{
            setIsPending(false);
            setAlert(<Alert variant="warning">
                Name or Category of the product is left empty! Kindly re-input fields!
            </Alert>)
        }
    }

    return ( 
        <div className="create">
            <h1><strong>Add a new Product</strong></h1>
            <form onSubmit={submitForm}>
                <label>Name: </label>
                <input
                    type = "text"
                    required
                    value = {product.name}
                    onChange = {(e) => setValue('name', e.target.value)}
                ></input>
                <label>Image Source: </label>
                <input
                    type = "text"
                    required
                    value = {product.img_src}
                    onChange = {(e) => setValue('img_src', e.target.value)}
                ></input>
                <label>Price: </label>
                <input
                    type = "number"
                    required
                    value = {product.price}
                    onChange = {(e) => setValue('price', e.target.value)}
                />
                <label>Category: </label>
                <select
                  value = {product.category}
                  onChange = {(e) => setValue('category', e.target.value)}
                >
                  <option key={'empty'} value=''>Please Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                {alert}
                {!isPending && <button>Add New Product</button>}
                {isPending && <button disabled>Adding New Product!...</button>}
            </form>
            {flag && <Navigate to='/' />}
        </div>
        );
    }

export default NewProduct;