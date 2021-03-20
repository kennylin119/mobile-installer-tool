// import logo from './logo.svg';
import "./App.css";

import { useState, useEffect } from "react";

// importing all the components
import Icons from "./component/Icons";
import Dropdown from "./component/Dropdown";

const App = () => {
	// set initially to empty object
	let [product, setProduct] = useState({});

	// TODO: skipping this step until we need to use this life cycle hook
	// useEffect(() => {
	//   const getProduct = () => {

	//     // Get the product from fetchProduct
	//     // const data = fetchProduct()
	//     // const productFromProductAPI = {}
	//     // setProduct(productFromProductAPI)
	//   }

	//   getProduct()
	// }, [])

	// Temporary solution
	const productFromProductAPI = {
		Product: "Alisse",
		Features: {
			SYSTEM: {
				Options: {
					HW: "HomeWorks (QSX)",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			WALLBOX_SHAPE: {
				Options: {
					S: "Square Backbox",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			COLUMNS: {
				Options: {
					1: "1-Column",
					2: "2-Column",
					3: "3-Column",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			BUTTON_ARRAY: {
				Options: `{
          "1": "1 Button",
          "2": "2 Button",
          "3": "3 Button",
          "11": "1, 1 Button",
          "13": "1, 3 Button",
          "22": "2, 2 Button",
          "31": "3, 1 Button",
          "33": "3, 3 Button",
          "111": "1, 1, 1 Button",
          "133": "1, 3, 3 Button",
          "222": "2, 2, 2 Button",
          "331": "3, 3, 1 Button",
          "333": "3, 3, 3 Button"
        }`,
				FeatureType: "Option",
				DependentFeatures: ["COLUMNS"],
			},
			FACEPLATE_FINISH: {
				Options: {
					AB: "Aged Brass",
					GP: "Graphite",
					BL: "Matte Black",
					SN: "Satin Nickel",
					BC: "Bright Chrome",
					AZ: "Aged Bronze",
					BRB: "Brushed Brass",
					BWH: "Brilliant White",
					CP: "Champagne",
					AWH: "Architectural White",
					SWH: "Snow White",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			CUSTCOLOR_FACEPLATE: {
				Options: {
					N: "None,",
					RAL1004: "RAL 1004 Golden Yellow,",
					RAL1012: "RAL 1012 Lemon Yellow,",
					RAL2003: "RAL 2003 Pastel Orange,",
					"...deleted a lot of entries for brevity": "brevity...",
					RAL9003: "RAL 9003 Signal White,",
					RAL7013: "RAL 7013 Brown Grey,",
					RAL8000: "RAL 8000 Green Brown,",
					RAL8002: "RAL 8002 Signal Brown,",
					RAL8008: "RAL 8008 Olive Brown,",
				},
				FeatureType: "Option",
				DependentFeatures: ["FACEPLATE_FINISH"],
			},
			ENGRAVING_SPECIFIED: {
				Options: {
					TBD: "TBD",
					N: "No",
					Y: "Yes",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			IS_DEMO: {
				Options: {
					N: "No",
					Y: "Yes",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			COUNTRY: {
				Options: {
					BD: "Bangladesh",
					BL: "Saint Barthelemy",
					BG: "Bulgaria",
					"...deleted a lot of entries for brevity": "brevity...",
					UZ: "Uzbekistan",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			COMPONENTS: {
				Options: {
					KB: "Keypad, Base",
					KO: "Keypad Only",
					KBW: "Keypad, Base, Backbox",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			ProductDetails: {
				Options: {
					NPKP: "Keypad",
				},
				FeatureType: "Option",
				DependentFeatures: [],
			},
			PERSONALIZATION_ID: {
				FeatureType: "Text",
				DependentFeatures: ["ENGRAVING_SPECIFIED"],
			},
		},
		UsedElevatedAccess: false,
	};

	product = productFromProductAPI;
	console.log(product);

	let product_icons;

	if (product != null) {
		product_icons = product.Features.BUTTON_ARRAY.Options;
	} else {
		product_icons = null;
		console.log("product could not be loaded");
	}

	return (
		<div className='container'>
			<Icons icons={JSON.parse(product_icons)}></Icons>
			{/* <Dropdown /> */}
		</div>
	);
};

export default App;
