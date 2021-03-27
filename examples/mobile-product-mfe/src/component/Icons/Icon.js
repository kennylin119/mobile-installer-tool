import default_img from '../../toolkit/default_image.jpeg'
import {handleCallback} from './Icons'

const handleOnClick = (event, key, value, selected) => {
	console.log('The link was clicked');

	// prevent browser reload/refresh
	event.preventDefault();

	handleCallback(event, key, value, selected);
}

const Icon = (props) => {
	const {icon_key, cdn, icon_value, icon_image, icon_selected} = props
	let image; 

	// Handle if there is an image or not
	if(cdn && icon_image) {
		image = `${cdn}${icon_image}`
	}
	else {
		image = default_img
	}

	return (
		<div id="icon-box">
			{
				<img id="icon" src={image} alt={"Image invalid"} onClick={((e) => handleOnClick(e, icon_key, icon_value, icon_selected))}></img>
			}
			{icon_value}
		</div>
	);
};

export default Icon;
