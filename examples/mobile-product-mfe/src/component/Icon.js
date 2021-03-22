const Icon = (props) => {
	console.log(props)
	const {icon} = props

	return (
		// <div className='icon'>
		// 	<h3>{value}</h3>
		// </div>
		<div>
			{icon}
		</div>
	);
};

export default Icon;
