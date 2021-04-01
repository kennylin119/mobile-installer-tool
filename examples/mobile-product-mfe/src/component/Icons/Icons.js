import React, { useState, useContext } from "react"
import { Product } from "../../product-context"
import Icon from "./Icon"
import { handleCallback } from "../../App"

// Global level icons object that can be modified by Icon.js
let renderIcons

export const handleIconCallback = (key, value, selected) => {
	// Alternate the boolean value on the icon that the user selected
	console.log(renderIcons[key])
	renderIcons[key].selected = !renderIcons[key].selected
	console.log(renderIcons[key].selected)

	handleCallback({ cmd: "hIconClick", value: { key, value } })
}

// Function to parse an array into an object based on a key
const convertArrayToObject = (array, key) => {
	const initialValue = {}
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		}
	}, initialValue)
}

// Main function
const Icons = (props) => {
	// fetch = fetchImage
	const { fetch } = props
	let selected_test = 3

	// getting the context object, extracting the product
	const context = useContext(Product)
	const product = context.product

	let icons = product.UserControls[3].OptionValues
	let cdn = product.CDNPrefix

	// State variables
	let [icons_obj, setIcons_obj] = useState(null)
	let [isSet, setIsSet] = useState(false)

	if (!isSet) {
		// Temporary variable to store icons array
		let temp_icons = []

		// Map over the array
		icons.map((obj) => {
			temp_icons.push({
				icon_key: obj.KeyValue,
				icon_value: obj.Label,
				icon_image: obj.Image,
				active: obj.KeyValue.length === selected_test ? true : false,
				selected: false,
			})
		})

		setIcons_obj(temp_icons)
		setIsSet(true)
	}

	if (!isSet) {
		console.log("ICONS NOT LOADED YET")
		return <div className='container-loading'>Loading Icons...</div>
	} else {
		if (icons_obj) {
			// TODO: change this to icons_obj then get rid of renderIcons
			renderIcons = convertArrayToObject(icons_obj, "icon_key")

			console.log("render icons")
			console.log(renderIcons)

			return (
				<div className='img-container'>
					<div className='img-container-title'>Icons</div>
					{Object.entries(renderIcons).map((_obj) => (_obj[1].active ? <Icon key={_obj[1].icon_key} cdn={cdn} icon_key={_obj[1].icon_key} icon_value={_obj[1].icon_value} icon_image={_obj[1].icon_image} icon_selected={_obj[1].selected}></Icon> : null))}
				</div>
			)
		} else {
			return <div className='container-product-error'>Cannot load icons</div>
		}
	}
}

export default Icons
