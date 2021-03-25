import React from "react";
import { useState, useEffect } from "react";
import Icon from "./Icon";

const Icons = (props) => {
	// fetch = fetchImage
	const {icons, cdn, fetch} = props;

	// Handle the load image here
	icons.map(obj => {
		fetch(`${cdn}${obj.image}`)
			.then(res => {
				console.log("returned image")
				console.log(res)
			})
			// .then(
			// 	(result) => {
			// 		// save the image to local directory
			// 		console.log(result)
			// 	},
			// 	(error) => {
			// 		// set the image to be loaded as a default image
			// 		console.log("fetching image error")
			// 		console.log(error)
			// 	}
			// )
	})


	return (
		<div>
			{
				icons.map(obj => (
					<Icon key={obj.KeyValue} icon_key={obj.KeyValue} icon_value={obj.Label} icon_image={obj.Image}></Icon>
				))
			}
		</div>

	)
};

export default Icons;
