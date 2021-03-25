import default_img from '../../toolkit/default_image.jpeg'

const Icon = (props) => {
	console.log(props)
	const {icon_key, cdn, icon_value, icon_image} = props

	let image; 

	console.log(cdn)


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
				<img id="icon" src={image} alt={"Image invalid"} ></img>
			}
		</div>
	);
};

export default Icon;
