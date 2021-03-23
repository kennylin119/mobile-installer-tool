const Icon = (props) => {
	console.log(props)
	const {icon_key, icon_value, icon_image} = props

	return (
		<div>
			{icon_value}
			{
				<img src="../toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1,_1_Button.png"  alt="hi"></img>
			}
		</div>
	);
};

export default Icon;
