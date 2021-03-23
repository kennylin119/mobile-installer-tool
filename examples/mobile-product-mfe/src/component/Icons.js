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

			{/* <Icon icon_key={v[5]} icon_value={icons[v[5]]}/>

			for (let {i = 0; i < v.length; i++) {
				{ <Icon icon_key={v[i]} icon_value={icons[v[i]]}/> }
			} */}

			{
				v.forEach(key => {
					// console.log(key)
					// console.log(icons[key])
					return <Icon icon_key={key} icon_value={icons[key]}></Icon>
					// <li>{key}</li>
				})
			}

			{/* { arr.map(function(arrKey) {	
				<p>{arrKey}</p>		
				// <Icon icon_key={key} icon_value={icons[key]}/>
			})}  */}
		</ul>

	)
};

export default Icons;
