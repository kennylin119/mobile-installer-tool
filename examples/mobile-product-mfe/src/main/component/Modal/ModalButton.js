import { useState } from 'react';

import ModalGrid from './ModalGrid';

const handleOnClick = (showModal, setShowModal) => {
  setShowModal(!showModal);
  document.querySelector('body').style.overflow = 'hidden';
  document.getElementById('fixed-buttons').style.display = 'none';
};

const ModalButton = (props) => {
  console.log('[Grid]');
  const {
    variable, data, cdn, zoomResComponentData, iconsObj,
  } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="fancy-button" type="submit" onClick={(_e) => handleOnClick(showModal, setShowModal)}> choose fabric </button>
      {showModal ? <ModalGrid showModal={showModal} setShowModal={setShowModal} variable={variable} data={data} cdn={cdn} zoomResComponentData={zoomResComponentData} iconsObj={iconsObj} /> : null}
    </div>
  );
};

export default ModalButton;
