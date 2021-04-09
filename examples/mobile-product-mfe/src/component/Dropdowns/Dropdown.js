import DropdownButton from 'react-bootstrap/DropdownButton';
import default_img from '../../toolkit/default_image.jpeg';

const handleOnClick = (event, key, value) => {
	event.preventDefault();
}

const Dropdown = (props) => {

    // Using default images, as seen in Icon.js logic
	const {icon_key, cdn, icon_value, icon_image} = props
	let image; 

	// Handle if there is an image or not
	if(cdn && icon_image) {
		image = `${cdn}${icon_image}`
	}
	else {
		image = default_img
	}

	return (
		<div>
        <label htmlFor="image-selector">Select an option:</label>
        <select name="image-selector" id="image-selector">
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>
	);
};

export default Dropdown;

