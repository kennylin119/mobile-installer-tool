import React from "react";
import NativeDropdown from "./NativeDropdown";

const NativeDropdowns = (props) => {
	const {dropdowns, cdn} = props;

	return (
		<div className="img-selection-list-container">
			{
				dropdowns.map(obj => (
					<NativeDropdown key={obj.KeyValue} cdn={cdn} icon_key={obj.KeyValue} icon_value={obj.Label} icon_image={obj.Image} ></NativeDropdown>
				))
			}
		</div>

	)
};

export default NativeDropdowns;
