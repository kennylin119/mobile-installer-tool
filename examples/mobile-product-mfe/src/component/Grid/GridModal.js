import styled from "styled-components"
import ModalIcon from "../Grid/ModalIcon"


const Modal = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, .75);
	display: flex;
	align-items: center;
	justify-content: center;
`

const ModalContent = styled.div`
	overflow-y:auto;
	height:90vh;
	&::-webkit-scrollbar{
		display: none;
	}
`;

const GridContent = styled.div`
	width:95vw;
	margin: 1rem;

	display: grid;
	grid-template-columns: auto auto auto;
	grid-gap: .5rem;

	@media only screen and (min-width: 768px) {
		// for desktop
		width: 600px;
	}
`


const GridModal = (props) => {
	const { showModal, setShowModal, variable, data, cdn, zoomResComponentData, iconsObj } = props
	console.log("[GridModal]")

	return (
		<Modal onClick={(e) => setShowModal(!showModal)}>
			<div styel={{"overflow-y":"initial"}} onClick={(e) => e.stopPropagation()}>
				<ModalContent>
					{variable}
					<GridContent>
						{zoomResComponentData?.ValidKeys.map((obj) => (
							<ModalIcon setShowModal={setShowModal}key={obj} cdn={cdn} icon_key={obj} icon_value={iconsObj[obj].Label} icon_image={iconsObj[obj].Image} icon_selected={zoomResComponentData.CurrentValue} componentName={variable}></ModalIcon>
						))}
					</GridContent>
				</ModalContent>
			</div>
		</Modal>
	)
}

export default GridModal
