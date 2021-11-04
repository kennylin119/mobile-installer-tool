/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
import styled from 'styled-components';
import ModalIcon from './ModalIcon';

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
`;

const ModalContent = styled.div`
	height:80vh;
	width:90vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	border-radius: 8px;
	padding: 1rem;

	@media only screen and (min-width: 768px) {
		// for desktop
		height: 90vh;
		width: 650px;
	}
`;

const ModalBody = styled.div`
	width: 100%;
	height: 100%;
	overflow-y:auto;
	&::-webkit-scrollbar{
		display: none;
	}
`;

const GridContent = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: .2rem;
	justify-content: center;
`;

const ModalGrid = (props) => {
  const {
    showModal, setShowModal, variable, cdn, zoomResComponentData, iconsObj,
  } = props;

  return (
    <Modal data-testid="Modal" onClick={(e) => { setShowModal(!showModal); document.querySelector('body').style.overflow = 'visible'; document.getElementById('fixed-buttons').style.display = 'block'; }}>
      <button data-testid="Button" className="transparent" onClick={(e) => { setShowModal(!showModal); document.querySelector('body').style.overflow = 'visible'; }}>X</button>
      <ModalContent data-testid="ModalContent" style={{ overflowY: 'initial' }} onClick={(e) => e.stopPropagation()}>
        <h1 data-testid="title">{variable}</h1>
        <ModalBody data-testid="ModalBody">
          <GridContent data-testid="GridContent">
            {zoomResComponentData?.ValidKeys.map((obj) => (
              <ModalIcon setShowModal={setShowModal} key={obj} cdn={cdn} icon_key={obj} icon_value={iconsObj[obj].Label} icon_image={iconsObj[obj].Image} icon_selected={zoomResComponentData.CurrentValue} componentName={variable} />
            ))}
          </GridContent>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalGrid;
