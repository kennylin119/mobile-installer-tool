import React from "react";
import Icon from "./Icon";

const Icons = (props) => {
	// fetch = fetchImage
	const {icons, cdn} = props;

	return (
		<div>
			{
				icons.map(obj => (
					<Icon key={obj.KeyValue} cdn={cdn} icon_key={obj.KeyValue} icon_value={obj.Label} icon_image={obj.Image}></Icon>
				))
			}
		</div>

	)
};

export default Icons;
