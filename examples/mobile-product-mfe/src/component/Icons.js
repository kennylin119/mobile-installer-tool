import React from "react";
import Icon from "./Icon";

const Icons = ({ icons }) => {
	console.log(icons);

	let elem = Object.keys(icons);
	let elem2 = Object.values(icons);
	console.log(elem);
	console.log(elem2);

	for (const [key, value] of Object.entries(icons)) {
		console.log(`${key} ${value}`);
	}

	return <div className='icons'></div>;
};

export default Icons;
