import React from "react";
import Dropdown from "./Dropdown";

const Dropdowns = (props) => {
	const {dropdowns, cdn} = props;

	return (
		<div className="img-selection-list-container">
			{
				dropdowns.map(obj => (
					<Dropdown key={obj.KeyValue} cdn={cdn} icon_key={obj.KeyValue} icon_value={obj.Label} icon_image={obj.Image} ></Dropdown>
				))
			}
		</div>

	)
};

export default Icons;
