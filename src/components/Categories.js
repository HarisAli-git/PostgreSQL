import { useEffect, useState} from "react";
import { Fetch_cat_Mongo } from "../middleware/RESTapi_caller";
import { Link } from "react-router-dom";

const Display = (cat) => {
    let a2 = Object.values(cat).map((cats, index) => (
        <div key={index} className="container-fluid open-cont">
            <div className="container course-cont">
            
            <div className="cpc">
                <p className="cp">{cats.name}</p>
            </div>
            
        </div>
    </div>
))

return <ul>{a2}</ul>;
} 

const Categories = () => {

    const [category, setCategory] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [img_src, setImgSrc] = useState('');
    const [cat, setCat] = useState('');
    const [index, setIndex] = useState('');

    const FetchCategories = (e) => {
        Fetch_cat_Mongo().then((response) => {
            console.log(response.data);
            setCat(response.data);
            console.log(cat);
        }); 
        
        return []
    }

    useEffect(() => {
        console.log("Mongo Categories_Mounted!!!");
        FetchCategories();
    }, []);

    return ( 
        <div className="create">
                <h2>Category: </h2>
                {console.log(cat)}
                {Display(cat)}
        </div>
        );
    }

export default Categories;