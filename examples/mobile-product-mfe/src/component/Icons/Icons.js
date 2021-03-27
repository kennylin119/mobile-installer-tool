import React, {useState} from "react";
import Icon from "./Icon";
import {generateDAO} from '../../services/IconsDataAccessObject'




export const handleCallback = (event, key, value) => {
	console.log('inside handleCallback function')
	console.log(event);
	console.log([key, value]);

	const conf = generateDAO()	
}



const Icons = (props) => {
	// fetch = fetchImage
	const {icons, cdn, selected} = props;
	let selected_test = 3;


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
				active: obj.KeyValue.length === selected_test ? true : false
			})
		})

		setIcons_obj(temp_icons);
		setIsSet(true);
	}

	console.log("printing")
	console.log(icons_obj)

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
			return (
				<div className="img-container">
					<div className="img-container-title">
						Icons
					</div>
					{
						icons_obj.map(obj => (
							obj.active 
							? <Icon key={obj.icon_key} cdn={cdn} icon_key={obj.icon_key} icon_value={obj.icon_value} icon_image={obj.icon_image} ></Icon>
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
