import React, {useState} from "react";
import Icon from "./Icon";
import {generateDAO} from '../../services/IconsDataAccessObject'

// Global level icons object that can be modified by Icon.js
let renderIcons; 

export const handleCallback = (event, key, value, selected) => {
	console.log('inside handleCallback function');
	console.log(selected);

	// Alternate the user selection
	console.log(renderIcons[key]);
	// renderIcons[key].selected = !renderIcons[key].selected;

	// console.log(renderIcons[key].selected);


	const conf = generateDAO(key, value);
}


const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
	  return {
		...obj,
		[item[key]]: item,
	  };
	}, initialValue);
};



const Icons = (props) => {
	// fetch = fetchImage
	const {icons, cdn, selected} = props;
	let selected_test = 2;


	// State variables 
	let [icons_obj, setIcons_obj] = useState(null);
	let [isSet, setIsSet] = useState(false);

	if(!isSet) {
		// Temporary variable to store icons array
		let temp_icons = [];

		icons.map(obj => {
			temp_icons.push({
				icon_key: obj.KeyValue, 
				icon_value: obj.Label, 
				icon_image: obj.Image, 
				active: obj.KeyValue.length === selected_test ? true : false,
				selected: false
			})
		})

		setIcons_obj(temp_icons);
		setIsSet(true);
	}

	// console.log("printing")
	// console.log(icons_obj)

	if(!isSet) {
		console.log("ICONS NOT LOADED YET");
		return (
			<div className="container-loading">
				Loading Icons...
			</div>
		)
	}
	else {
		if(icons_obj) {
			renderIcons = convertArrayToObject(icons_obj, 'icon_key');

			console.log("render icons")
			console.log(renderIcons)

			return (
				<div className="img-container">
					<div className="img-container-title">
						Icons
					</div>
					{
						Object.entries(renderIcons).map(_obj => (
							_obj[1].active 
							? <Icon key={_obj[1].icon_key} cdn={cdn} icon_key={_obj[1].icon_key} icon_value={_obj[1].icon_value} icon_image={_obj[1].icon_image} icon_selected={_obj[1].selected}></Icon>
							: null
						))
					}
				</div>
			)
		}
		else {
			return (
				<div className='container-product-error'>
					Cannot load icons
				</div>
			)
		}
		
	}
};

export default Icons;
