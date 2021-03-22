import React from "react";
import Icon from "./Icon";

const Icons = (props) => {
	const {icons} = props;

	// let elem = Object.keys(icons);
	// let elem2 = Object.values(icons);
	// console.log(elem);
	// console.log(elem2);

	// for (const [key, value] of Object.entries(icons)) {
	// 	console.log(`${key} ${value}`);
	// }

	// return <div className='icons'></div>;

	const v = Object.keys(icons)
	v.map(function(key, index) {
		console.log(icons[key])
	})

	return (
		{Object.keys(icons).map(function(key, index) {
				
		})}


		// <Icon icon={icons[1]}></Icon>
	)
};

export default Icons;
