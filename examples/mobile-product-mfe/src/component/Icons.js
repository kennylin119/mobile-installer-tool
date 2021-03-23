import React from "react";
import Icon from "./Icon";

const Icons = (props) => {
	const {icons} = props;

	console.log(icons)

	
	// Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would
	const v = Object.keys(icons)

	return (
		<div>
			{
				v.map(key => (
					<Icon icon_key={key} icon_value={icons[key]}></Icon>
				))
			}
		</div>

	)
};

export default Icons;
