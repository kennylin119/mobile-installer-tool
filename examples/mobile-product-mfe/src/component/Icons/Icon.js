import default_img from '../../toolkit/default_image.jpeg'

const handleOnClick = (event, key, value) => {
	console.log('The link was clicked');
	console.log(event);
	console.log([key, value]);

	// prevent browser reload/refresh
	event.preventDefault();
}

const Icon = (props) => {
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
		<div id="icon-box">
			{
				<img id="icon" src={image} alt={"Image invalid"} onClick={((e) => handleOnClick(e, icon_key, icon_value))}></img>
			}
		</div>
	);
};

export default Icon;
