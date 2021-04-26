import { useState } from 'react';

import GridModal from './GridModal';

const handleOnClick = (showModal, setShowModal) => {
  setShowModal(!showModal);
  document.querySelector('body').style.overflow = 'hidden';
  document.getElementById('fixed-buttons').style.display = 'none';
};

const Grid = (props) => {
  console.log('[Grid]');
  const {
    variable, data, cdn, zoomResComponentData, iconsObj,
  } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <input className="fancy-button" type="submit" value="Choose Fabric" onClick={(_e) => handleOnClick(showModal, setShowModal)} />
      {showModal ? <GridModal showModal={showModal} setShowModal={setShowModal} variable={variable} data={data} cdn={cdn} zoomResComponentData={zoomResComponentData} iconsObj={iconsObj} /> : null}
    </div>
  );
};

export default Grid;
