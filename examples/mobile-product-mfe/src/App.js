// import logo from './logo.svg';
import "./App.css";

import { useState, useEffect } from "react";

// importing all the components
import Icons from "./component/Icons";
import Dropdown from "./component/Dropdown";

import productFromProductAPI from "./ALISSE.js";

const App = () => {
	// set initially to empty object
	let [product, setProduct] = useState({});

	// TODO: skipping this step until we need to use this life cycle hook
	// useEffect(() => {
	//   const getProduct = () => {

	//     // Get the product from fetchProduct
	//     const data = fetchProduct()
	//     const productFromProductAPI = {}
	//     setProduct(productFromProductAPI)
	//   }

	//   getProduct()
	// }, [])

	//const productFromProductAPI = 10;

	product = productFromProductAPI;
	console.log(product[0]);

	let product_icons;

	if (product != null) {
		product_icons = product[0].UserControls[3].OptionValues;
	} else {
		product_icons = null;
		console.log("product could not be loaded");
	}

	return (
		<div className='container'>
			<Icons icons={product_icons}></Icons>
		</div>
	);
};

export default App;
