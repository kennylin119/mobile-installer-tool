
import "./App.css";

import { useState, useEffect } from "react";

// importing all the components
import Icons from "./component/Icons/Icons";
import Dropdown from "./component/Dropdowns/Dropdown";
import { router, fetchProduct } from "./router/router";


// import productFromProductAPI from "./ALISSE.js";

const App = (props) => {
	// Destructuring props
	// data will contain the AUTHORIZATION TOKEN 
	const {data} = props;

	// Hard coded product name, will be whatever data is 
	let data2 = "ALISSE";

	// State variables for the product
	let [product, setProduct] = useState(null);				// Truthy object
	let [error, setError] = useState(null);
	let [isLoaded, setIsLoaded] = useState(false);

	// Life cycle hook
	useEffect(() => {
		// Gauranteed way to return a promise 
		const getProduct = async () => {
			// Getting the data from fetchProduct
			// Handling the response if result or error
			await fetchProduct(data2)
				.then(res => res.json())
				.then(
					(result) => {
						setIsLoaded(true);
						setProduct(result)
					},
					(error) => {
						setIsLoaded(true);
						setError(error)
					}
				)
		}

		getProduct()
	}, [])	// [] data dependency


	// If there was an error
	if(error) {
		console.log("ERROR OCCURED")
		return (
			<div>Error: {error.message}</div>
		)
	}
	// If the product hasn't loaded yet
	else if(!isLoaded) {
		console.log("NOT LOADED YET")
		return (
			<div>Loading...</div>
		)
	}
	// If the product has been loaded
	else {
		console.log(product)

		if(product) {
			let product_icons;
			product_icons = product[0].UserControls[3].OptionValues;
	
			return (
				<div className='container'>
					<Icons icons={product_icons}></Icons>
				</div>
			)
		} else {
			return (
				<div>
					Cannot load
				</div>
			)
		}	
	}
};

export default App;
