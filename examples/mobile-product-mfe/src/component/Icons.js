import React from "react";
import Icon from "./Icon";

const Icons = (props) => {
	const {icons} = props;

	console.log(icons)

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
