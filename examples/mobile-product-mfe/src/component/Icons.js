import React from "react";
import Icon from "./Icon";

const Icons = (props) => {
	const {icons} = props;

	console.log(icons)

	
	// Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would
	const v = Object.keys(icons)
	v.map(function(key, index) {
		// console.log(key)
		// console.log(icons[key])
	})
	

	// for (key in v) {
	// 	<Icon icon_key={key} icon_value={icons[key]}/>
	// }

	const arr = ['key1','key2','key3']

	return (
		<ul>
			{ arr.map(arrKey=> (	
				<li>{arrKey}</li>		
				// <Icon icon_key={key} icon_value={icons[key]}/>
			))} 
		</ul>

	)
};

export default Icons;
