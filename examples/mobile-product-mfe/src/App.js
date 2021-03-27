import "./App.css"

import { useState, useEffect } from "react"

// importing all the components
import Icons from "./component/Icons/Icons"
import Dropdown from "./component/Dropdowns/Dropdown"
import { router, fetchProduct, fetchImage } from "./router/router" // Note: fetchProduct is a singleton

// import productFromProductAPI from "./ALISSE.js";

const App = (props) => {
	// Destructuring props
	// data will contain the AUTHORIZATION TOKEN
	const { data, configure } = props
	const configure_test = {
		BillOfMaterialsLineItemId: 7407192,
		ConfiguredJSON:
			'{"Product":"Alisse","Category":null,"Details":null,"IsConfigured":true,"Selections":{"SYSTEM":"HW","WALLBOX_SHAPE":"S","COLUMNS":"2","BUTTON_ARRAY":"33","FACEPLATE_FINISH":"AZ","ENGRAVING_SPECIFIED":"TBD","COUNTRY":"US","COMPONENTS":"KO","IS_DEMO":"N","ProductDetails":"NPKP"},"Filters":null,"AutoSelections":null,"Warnings":["The Alisse keypad requires the use of a Base Unit for installation.  \\"Keypad Only\\" should be selected for replacement keypads where a Base Unit is already present."],"ModelType":null,"ProductType":null,"ResultantValue":{"PSTORE_MODEL":"HW-S-AZ-S-10101-10101-AZ-E"},"SelectionValues":{"SYSTEM":"HomeWorks (QSX)","WALLBOX_SHAPE":"Square Backbox","COLUMNS":"2-Column","BUTTON_ARRAY":"3, 3 Button","FACEPLATE_FINISH":"Aged Bronze","ENGRAVING_SPECIFIED":"TBD","COUNTRY":"United States","COMPONENTS":"Keypad Only","IS_DEMO":"No","ProductDetails":"Keypad","PSTORE_MODEL":"HW-S-AZ-S-10101-10101-AZ-E"},"AutoValues":null}',
		AdditionalAttributes: null,
		IsFullyConfigured: false,
		VolumeDiscountEligiblePanels: null,
		ValidationErrorType: 0,
		ErroneousFeatures: null,
		RowVersion: "AAAAAAHhvJs=",
		OverrideListPrice: null,
		OverrideLeadTime: null,
		OverrideDiscountedPrice: null,
		ListPriceAdjustment: null,
		ModelNumber: "NPKP",
		FGID: "HW-NW-KP-S2-E",
		MinLeadTime: 20,
		MaxLeadTime: 20,
		DiscountedPrice: null,
		QuotableTill: null,
		MinPrice: 525.0,
		MaxPrice: 525.0,
	};

	// Hard coded product name, will be whatever data is
	let data2 = "ALISSE"

	// State variables for the product
	let [product, setProduct] = useState(null) // Truthy object
	let [error, setError] = useState(null)
	let [isLoaded, setIsLoaded] = useState(false)
	let [cdnPrefix, setCdnPrefix] = useState(null)

	// Life cycle hook
	useEffect(() => {
		// Gauranteed way to return a promise
		const getProduct = async () => {
			if (isLoaded && product) {
				console.log("finished")
				return;
			}

			// Getting the data from fetchProduct
			// Handling the response if result or error
			await fetchProduct(data2)
				.then((res) => res.json())
				.then(
					(result) => {
						setIsLoaded(true)
						setProduct(result)
						// extracting the cdn
						setCdnPrefix(result[0].CDNPrefix)
					},
					(error) => {
						setIsLoaded(true)
						setError(error)
					}
				)
		}

		getProduct()
	}, []) // [] data dependency

	// If there was an error
	if (error) {
		console.log("ERROR OCCURED")
		return <div className='container-fetch-error'>Error: {error.message}</div>
	}
	// If the product hasn't loaded yet
	else if (!isLoaded) {
		console.log("NOT LOADED YET")
		return <div className='container-loading'>Loading...</div>
	}
	// If the product has been loaded
	else {
		// Check if configure exists
		if(configure_test) {
			let configured_json = configure_test.ConfiguredJSON;

			console.log("printing user configured json obj");
			console.log(JSON.parse(configured_json))
		}

		if (product) {
			let image_path = `./toolkit/${product[0].ProductIdentifier}/`

			// extracting the product icons
			let product_icons
			product_icons = product[0].UserControls[3].OptionValues

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
			return <div className='container-product-error'>Cannot load</div>
		}
	}
}

export default App
