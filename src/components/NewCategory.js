import { useState} from "react";
import { Post_SignUpCatMongo} from "../middleware/RESTapi_caller";
import { Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const NewCategory = () => {

    const [name, setName] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [alert, setAlert] = useState(' ');
    const [flag, setFlag] = useState(false);

    const isEmptyOrSpaces = (str) => {
      return str === null || str.match(/^ *$/) !== null;
    }

    const checkValidation = (params) => {
      console.log("Here the Params for New Category Validation: ", params)
    
      if (isEmptyOrSpaces(params.name))
      {
          return false;
      }
      return true;    
    }

    const submitForm = async (e) => {
      e.preventDefault();
      const category = {name};
      setIsPending(true);
      setAlert(' ');

      if (checkValidation(category))
      {
        const res = await Post_SignUpCatMongo(category);
        console.log(res);
        setAlert(<Alert variant="success">
                Category Successfully Added!
            </Alert>)
        setFlag(true);
      }
      else{
        setAlert(<Alert variant="warning">
                Name of the Category is left empty of is filled with WhiteSpaces! Kindly re-input fields!
            </Alert>)
        setIsPending(false);
      }
    }

    return ( 
        <div className="create">
        {console.log("I am here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")}
            <h1><strong>Add a new Category</strong></h1>
            <form onSubmit={submitForm}>
                <label>Name: </label>
                <input
                    type = "text"
                    required
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                ></input>
                {alert}
                {!isPending && <button>Add New Category</button>}
                {isPending && <button disabled>Adding New Category!...</button>}
            </form>
            {flag && <Navigate to='/' />}
        </div>
        );
    }

export default NewCategory;