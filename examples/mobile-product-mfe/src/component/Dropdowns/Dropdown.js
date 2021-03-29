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
        <DropdownButton id="dropdown-item-button" title="Dropdown button">
            <Dropdown.Item as="button">
                <img id="icon" src={image} alt={"Image invalid"} onClick={((e) => handleOnClick(e, icon_key, icon_value))}></img>
                Here is custom option!
            </Dropdown.Item>
        </DropdownButton>
	);
};

export default Dropdown;

