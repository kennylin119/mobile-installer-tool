import styled from "styled-components"
import ModalIcon from "../Grid/ModalIcon"


const Modal = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center; 
`

const GridContent = styled.div`
	width:600px;
	/* background-color: red;
	padding: 10px; */
	display: grid;
	grid-template-columns: auto auto auto;
	grid-gap: .5rem;
	overflow-y: auto;

	@media only screen and (min-width: 768px) {
		// for desktop
		width: 500px;
		

	}
`


const GridModal = (props) => {
	const { showModal, setShowModal, variable, data, cdn, zoomResComponentData, iconsObj } = props
	console.log("[GridModal]")

	return (
		<Modal onClick={(e) => setShowModal(!showModal)}>
			<div onClick={(e) => e.stopPropagation()}>
					{variable}
				<GridContent>
					{zoomResComponentData?.ValidKeys.map((obj) => (
						<ModalIcon setShowModal={setShowModal}key={obj} cdn={cdn} icon_key={obj} icon_value={iconsObj[obj].Label} icon_image={iconsObj[obj].Image} icon_selected={zoomResComponentData.CurrentValue} componentName={variable}></ModalIcon>
					))}
				</GridContent>
			</div>
		</Modal>
	)
}

export default GridModal
