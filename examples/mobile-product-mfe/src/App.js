import "./App.css"

import React, { useState, useEffect, useContext } from "react"

// importing the context API
import { Product } from "./product-context"
import { Zoom } from "./zoom-context"

// importing all the components
import Icons from "./component/Icons/Icons"
import Dropdown from "./component/Dropdowns/Dropdown"
import ProductImage from "./component/ProductImage/ProductImage"
import TestComponent from "./component/Test-Component/TestComponent"
import { router, fetchProduct, fetchImage } from "./router/router" // Note: fetchProduct is a singleton

const initializeZoom = (product) => {
	if (product) {
		console.log("[building initial zoom with product]")
	} else {
		console.log("[building empty initial zoom]")

		return {
			AccessLevels: null,
			AdditionalAttributes: [],
			AdditionalWarnings: null,
			ConfigurationStatus: null,
			CustomModelNumber: null,
			Errors: [],
			FGID: null,
			Features: {},
			GenericModelNumber: null,
			IsFullyConfigured: null,
			ModelType: null,
			Number: null,
			Product: null,
			UsedElevatedAccess: null,
			Warnings: null,
		}
	}
}

const handleCallback = (props) => {
	const { cmd, value } = props

	// Will contain a long list of commands that we can match on
	if (cmd == "hIconClick") {
		// call the router function to send data to Configurator API
		// zoomHandler()
	}
}

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
	}

	// Hard coded product name, will be whatever data is
	let data2 = "ALISSE"

	// State variables for the product
	let [product, setProduct] = useState(null) // Truthy object
	let [error, setError] = useState(null)
	let [isLoaded, setIsLoaded] = useState(false)
	let [cdnPrefix, setCdnPrefix] = useState(null)

	// TODO: Still need to create this updateProduct function to be added to context API
	// define the context API updateProduct function
	// this.updateProduct = (object) => {
	// 	console.log("[inside updateProduct]")
	// 	console.log(object)

	// 	this.setState((state) => ({
	// 		product: object,
	// 	}))
	// }

	// Life cycle hook to get and save the product on load
	useEffect(() => {
		// Gauranteed way to return a promise
		const getProduct = async () => {
			if (isLoaded && product) {
				console.log("finished")
				return
			}

			// Getting the data from fetchProduct
			// Handling the response if result or error

			// ! Might not need this function since the parent page makes the calls, we can probably just get the data directly
			await fetchProduct(data2)
				.then((res) => res.json())
				.then(
					(result) => {
						setIsLoaded(true)
						setProduct(result[0])

						// Product.product = result
						// this.updateProduct(result)
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
		if (configure_test) {
			let configured_json = configure_test.ConfiguredJSON

			// console.log("printing user configured json obj")
			// console.log(JSON.parse(configured_json))
		}

		// New method using Context API
		if (product) {
			// building the context API object
			let state = {
				product: product,
				// FIXME: this is dummy function for now. will be replaced with this.updateProduct
				updateProduct: () => {
					console.log("[called updateProduct from App]")
				},
			}

			let zoom_state = {
				zoom: initializeZoom(product),
				updateZoom: () => {
					console.log("[called updateZoom from App]")
				},
			}

			return (
				// Context API, passing the state in
				<Product.Provider value={state}>
					<Zoom.Provider value={zoom_state}>
						<div className='container'>
							<div className='row'>
								<div className='col-1'></div>
								<div className='col-4'>
									<ProductImage />
								</div>
								<div className='col-6'>
									<Icons />
								</div>
							</div>
						</div>
					</Zoom.Provider>
				</Product.Provider>
			)
		} else {
			return <div className='container-product-error'>Cannot load</div>
		}
	}
}
export { handleCallback }
export default App
