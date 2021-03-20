import Icon from "./Icon";

const Icons = ({ icons }) => {
	console.log(icons);

	// for (const key in icons) {
	// 	// console.log(`${key}: ${icons[key]}`);

	// 	return <Icon value={icons[key]}></Icon>;
	// }
	let task = [
		{
			key: 1,
			text: "1 Button",
			reminder: true,
		},
		{
			key: 2,
			text: "2 Button",
			reminder: false,
		},
	];

	// console.log(task[0].key);

	return (
		// Using a map function to render each icon
		<div className='icons'>
			{/* {task.map((s) => {
				<Icon key={s.key} value={s.value}></Icon>;
			})} */}

			{task.map((s, index) => {
				<Icon key={index} value={s}></Icon>;
			})}
		</div>
	);
};

export default Icons;
