import React from "react";
import Icon from "./Icon";
// import {generateDAO} from '../services/IconsDataAccessObject.js'




const Icons = (props) => {
	// fetch = fetchImage
	const {icons, cdn} = props;

	return (
		<div className="img-container">
			<div className="img-container-title">
				Icons
			</div>
			{
				icons.map(obj => (
					<Icon key={obj.KeyValue} cdn={cdn} icon_key={obj.KeyValue} icon_value={obj.Label} icon_image={obj.Image} ></Icon>
				))
			}
		</div>

	)
};

export default Icons;
