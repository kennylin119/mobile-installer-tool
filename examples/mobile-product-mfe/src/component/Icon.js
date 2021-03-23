// This default image is not required for now
import default_img from '../toolkit/default_image.jpeg'

const Icon = (props) => {
	console.log(props)
	const {icon_key, icon_value, icon_image} = props

	// const image = require(`${icon_image}`)
	let image = (`../${icon_image}`)

	image = require(`../toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1,_1_Button.png`)
	console.log(image)

	return (
		<div>
			{icon_value}
			{
				<img src={image.default}  alt={"Image invalid"}></img>
			}
		</div>
	);
};

export default Icon;
