import "./App.css"

import React, { useState, useEffect, useContext } from "react"

// importing the context API
import { Product } from "./product-context"
import { ZoomRequest, ZoomResponse } from "./zoom-context"

// importing all the components
import Icons from "./component/Icons/Icons"
import Dropdown from "./component/Dropdowns/Dropdown"
import ProductImage from "./component/ProductImage/ProductImage"
import TestComponent from "./component/Test-Component/TestComponent"
import { router, fetchUITemplate, fetchDPM, fetchImage } from "./router/router" // Note: fetchProduct is a singleton
// importing routing functions
import ZoomHandler from "./services/ZoomHandler"
import SelectionSlider from "./component/SelectionSlider/SelectionSlider.js"

/**
 * This function takes in product and configure and parses both objects to build out
 * a zoom object to return.
 *
 * @param {*} uitemplate == UITemplate
 * @param {*} dpm == Default product model
 * @param {*} configure == user configurations
 * @returns == zoom object
 */
const initializeZoom = (uitemplate, dpm, configure) => {
	if (uitemplate) {
		console.log("[building initial zoom with uitemplate]")
		console.log(uitemplate)

		if (configure) {
			configure = JSON.parse(configure)

			console.log("[and user configurations]")
			console.log(configure)
		}

		// Using optional chaining ?.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
		// TODO: familiarize with what each of these attributes mean
		// ! Not every zoom variable has all of these attributes. Are there other attributes that we missed?

		let _warnings = []
		let _features = {}
		let _additionalAttributes = []

		if (uitemplate?.UserControls) {
			uitemplate.UserControls.map((obj) => {
				let key = obj?.Variable
				let config_key = configure?.Selections[key] // configure.Selections.SYSTEM => HW
				// let config_label = configure.SelectionValues["SYSTEM"]
				let obj_OptionValues = obj?.OptionValues

				let _validKeys = []

				// console.log(`[${key}]`)
				// console.log(config_label)

				obj_OptionValues.map((option) => {
					let _keyValue = option?.KeyValue

					if (_keyValue) {
						_validKeys.push(_keyValue)
					}
				})

				// Setting object at the key
				_features[key] = {
					ValidKeys: _validKeys,
					InvalidKeys: [],
					CurrentValue: config_key,
				}
			})
		}

		if (configure?.Warnings) {
			_warnings = configure?.Warnings
		}

		// ! Are there other additionalAttributes other than from ResultantValue?
		if (configure?.ResultantValue) {
			_additionalAttributes.push(configure?.ResultantValue)
		}

		// TODO: need to go over this zoom object again
		return {
			// RESPONSE
			// AccessLevels: null,
			// AdditionalAttributes: _additionalAttributes,
			// AdditionalWarnings: null,
			// ConfigurationStatus: "Valid",
			// CustomModelNumber: uitemplate?.SubtitleTemplate[0]?.Keys[0] + "-N",
			// Errors: [],
			// FGID: null, // ! What is FGID??
			// Features: _features,
			// GenericModelNumber: uitemplate?.SubtitleTemplate[0]?.Keys[0],
			// IsConfigured: configure?.IsConfigured ? true : false,
			// IsFullyConfigured: false,
			// ModelType: configure?.ModelType,
			// Number: null,
			// Product: uitemplate?.ProductIdentifier,
			// UsedElevatedAccess: false,
			// Warnings: _warnings,

			// REQUEST
			ZoomInput: {
				ShipToNumber: 709323,
				LutronSellingCompany: "00101",
				Product: uitemplate?.ProductIdentifier,
				Selections: configure?.Selections,
				AccessLevels: 1,
			},
			OverrideSelections: configure?.ResultantValue,
			FeatureDependencies: {
				COLUMNS: ["BUTTON_ARRAY"],
				FACEPLATE_FINISH: ["CUSTCOLOR_FACEPLATE"],
				ENGRAVING_SPECIFIED: ["PERSONALIZATION_ID"],
			},
			IsQuoted: configure?.IsQuoted,
		}
	} else {
		console.log("[building empty initial zoom]")
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
	let PRODUCT_IDENTIFIER = "ALISSE"

	// State variables for the product
	let [product, setProduct] = useState(null)
	let [DPM, setDPM] = useState(null)
	let [error, setError] = useState(null)
	let [isLoaded, setIsLoaded] = useState(false)
	let [isLoadedDPM, setIsLoadedDPM] = useState(false)

	//set up access points for the zoom contexts
	const [zoomReqVal, setZoomReq] = useState(null)
	const [zoomResVal, setZoomRes] = useState(null)

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

			// fetch the UI template and handle response
			await fetchUITemplate(PRODUCT_IDENTIFIER)
				.then((res) => res.json())
				.then(
					(result) => {
						setIsLoaded(true)
						setProduct(result[0])
					},
					(error) => {
						setIsLoaded(true)
						setError(error)
					}
				)

			// fetch the DPM and handle response
			await fetchDPM(PRODUCT_IDENTIFIER)
				.then((res) => res.json())
				.then(
					(result) => {
						setIsLoadedDPM(true)
						setDPM(result)
					},
					(error) => {
						setIsLoadedDPM(true)
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
	else if (!isLoaded || !isLoadedDPM) {
		console.log("NOT LOADED YET")
		return <div className='container-loading'>Loading...</div>
	}
	// If the product has been loaded
	else {
		// New method using Context API
		if (product && DPM) {
			// We build the context API values before rendering

			// Building input zoom object using UI template and user configurations
			if (zoomReqVal == null) {
				setZoomReq(initializeZoom(product, DPM, configure_test.ConfiguredJSON)) // re-render the page
			}
			if (zoomReqVal && zoomResVal == null) {
				// Call Zoom Handler which calls configurator API, then we set the response to our zoom response context
				ZoomHandler(zoomReqVal).then((response) => {
					console.log(response)
					setZoomRes(response) // re-render the page
				})
			}

			// Render the DOM
			return (
				// Context API, passing the state in
				<Product.Provider value={{ product, setProduct }}>
					<ZoomRequest.Provider value={{ zoomReqVal, setZoomReq }}>
						<ZoomResponse.Provider value={{ zoomResVal, setZoomRes }}>
							<div className='container'>
								<div className='row'>
									<div className='col-1'></div>
									<div className='col-4'>
										{/* Only Product Image goes in this div */}
										<ProductImage />
									</div>
									<div className='col-6'>
										{/* Put all other components in this div */}
										<Icons />
										<div>
											<SelectionSlider />
										</div>
										<Dropdown></Dropdown>
									</div>
									<div className='col-1'></div>
								</div>
							</div>
						</ZoomResponse.Provider>
					</ZoomRequest.Provider>
				</Product.Provider>
			)
		} else {
			return <div className='container-product-error'>Cannot load</div>
		}
	}
}

export default App
