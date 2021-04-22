import styled from "styled-components"
import Icon from "../Icons/Icon"

const MyModalHeaderFooter = styled.div`
	padding: 10px;
`

const MyModalTitle = styled.div`
	margin: 0;
`

const MyModalBody = styled.div`
	padding: 10px;
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
`

const ImageContainer = styled.div`
	width: auto;
	height: 220px;
	background-color: #41b3a3;
	padding-top: 20px;
	padding-left: 15px;
	padding-right: 15px;
`

const GridModal = (props) => {
	const { showModal, setShowModal, variable, data, cdn, zoomResComponentData, iconsObj } = props
	console.log("[GridModal]")

	const MyModal = styled.div`
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: ${showModal ? 1 : 0};
		transition: all 0.3s ease-in-out;
		pointer-events: ${showModal ? "visible" : "none"};
	`

	const MyModalContent = styled.div`
		width: 500px;
		background-color: #fff;
		transition: all 0.3s ease-in-out;
		transform: ${showModal ? "translateY(-200px)" : "translateY(0)"};
	`

	return (
		<MyModal onClick={(e) => setShowModal(!showModal)}>
			<MyModalContent onClick={(e) => e.stopPropagation()}>
				<MyModalHeaderFooter>
					<MyModalTitle>Select a Fabric</MyModalTitle>
				</MyModalHeaderFooter>
				<MyModalBody>
					<ImageContainer onClick={(e) => setShowModal(!showModal)}>
						<div className='img-container-title'>{variable}</div>
						{zoomResComponentData?.ValidKeys.map((obj) => (
							<Icon key={obj} cdn={cdn} icon_key={obj} icon_value={iconsObj[obj].Label} icon_image={iconsObj[obj].Image} icon_selected={zoomResComponentData.CurrentValue} componentName={variable}></Icon>
						))}
					</ImageContainer>
				</MyModalBody>
				<MyModalHeaderFooter>
					<button className='button' onClick={(e) => setShowModal(!showModal)}>
						Close
					</button>
				</MyModalHeaderFooter>
			</MyModalContent>
		</MyModal>
	)
}

export default GridModal
