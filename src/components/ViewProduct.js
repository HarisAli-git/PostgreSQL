import { useParams } from "react-router-dom";
import {Fetch_Product_Mongo, Delete_Product_Mongo} from "../middleware/RESTapi_caller";
import { useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";


const ViewProduct = () => {

    const { id } = useParams();

    const [prod, setProd] = useState(' ');
    const [flag, setFlag] = useState(false);

    const FetchProduct = async (e) => {
        const res = await Fetch_Product_Mongo(id);
        console.log("Here is the response: ", res);
        setProd(res.data.data);
    }

    useEffect(() => {
        console.log("Mongo Single Product Mounted!!!");
        FetchProduct();
    }, []);

    const deleteProduct = () => {
        Delete_Product_Mongo(id);
        setFlag(true);
    } 

    return (  
        <div className="ViewArticle">
            <h1>Product Details:- </h1>
            { prod && 
            (<Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={prod.img_src} style={{ maxWidth: '300px', maxHeight: '380px' }}/>
                <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                <p>{prod.price}</p>
                <Card.Text>
                    The Product Falls in the {prod.category} category.
                </Card.Text>
                <Button variant="danger" onClick={deleteProduct}>Delete!</Button>
                </Card.Body>
            </Card>)}
            {flag && <Navigate to='/' />}
        </div>
    );
}
 
export default ViewProduct;