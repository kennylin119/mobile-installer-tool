const Icon = (props) => {
	console.log(props)
	const {icon_key, icon_value} = props

	return (
		<div>
			{icon_value}
		</div>
	);
};

export default Icon;
