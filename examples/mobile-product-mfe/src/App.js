
import "./App.css";

import { useState, useEffect } from "react";

// importing all the components
import Icons from "./component/Icons/Icons";
import Dropdown from "./component/Dropdowns/Dropdown";
import { router, fetchProduct, fetchImage } from "./router/router";		// Note: fetchProduct is a singleton


// import productFromProductAPI from "./ALISSE.js";

const App = (props) => {
	// Destructuring props
	// data will contain the AUTHORIZATION TOKEN 
	const {data} = props;
	// const fse = require('fs-extra');

	// Hard coded product name, will be whatever data is 
	let data2 = "ALISSE";

	// State variables for the product
	let [product, setProduct] = useState(null);				// Truthy object
	let [error, setError] = useState(null);
	let [isLoaded, setIsLoaded] = useState(false);
	let [cdnPrefix, setCdnPrefix] = useState(null);

	// Life cycle hook
	useEffect(() => {
		// Gauranteed way to return a promise 
		const getProduct = async () => {
			if(isLoaded && product) {
				console.log("finished")
				return;
			}

			// Getting the data from fetchProduct
			// Handling the response if result or error
			await fetchProduct(data2)
				.then(res => res.json())
				.then(
					(result) => {
						setIsLoaded(true);
						setProduct(result)
						// extracting the cdn 
						setCdnPrefix(result[0].CDNPrefix)
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
			<div className='container-fetch-error'>
				Error: {error.message}
			</div>
		)
	}
	// If the product hasn't loaded yet
	else if(!isLoaded) {
		console.log("NOT LOADED YET")
		return (
			<div className='container-loading'>
				Loading...
			</div>
		)
	}
	// If the product has been loaded
	else {
		// console.log(product)

		if(product) {
			let image_path = `./toolkit/${product[0].ProductIdentifier}/`

			// extracting the product icons
			let product_icons;
			product_icons = product[0].UserControls[3].OptionValues;

			// creating directory to store images
			// if(!fse.existsSync(image_path)) {
			// 	fse.mkdirSync(image_path, {
			// 		recursive: true
			// 	})
			// }

	
			return (
				<div className='container'>
					<Icons icons={product_icons} cdn={cdnPrefix} fetch={fetchImage}></Icons>
				</div>
			)
		} else {
			return (
				<div className='container-product-error'>
					Cannot load
				</div>
			)
		}	
	}
};

export default App;
