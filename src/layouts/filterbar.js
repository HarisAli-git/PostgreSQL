import React from "react"
import {Main} from '../components/Main'
import { useEffect, useState} from "react";
import { Dropdown } from "react-bootstrap"
import { Fetch_cat_Mongo } from "../middleware/RESTapi_caller";
import { Alert } from "react-bootstrap";

const FilterBar = () =>
{
  const [categories, setcategories] = useState(' ');
  const [currentCat, setcurrentCat] = useState(false);

    const FetchCategories = async (e) => {
      const resp = await Fetch_cat_Mongo()
      setcategories(resp.data)
    }

    useEffect(() => {
        console.log("Mongo Categories Mounted in Filter Categories!!!!!!");
        FetchCategories();
    }, []);

    return(
    <div>
    
    {!currentCat &&
      <Alert variant="info"> Choosen Category: Any Category! </Alert>}
    {currentCat &&
      <Alert variant="info"> Choosen Category: {currentCat} </Alert>}
    
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter By Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item onClick={() => {setcurrentCat(false)}}>Any Category</Dropdown.Item>
        {Object.values(categories).map((cats, index) => (
          <Dropdown.Item key={index} onClick = {(e) => setcurrentCat(cats.name)}>{cats.name}</Dropdown.Item>))}
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <br />
      <Main value={currentCat}></Main>
    </div>);
  }

export default FilterBar;