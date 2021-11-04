/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import ModalGrid from '../../../main/component/Modal/ModalGrid';
import { ZoomResponse, ZoomRequest } from '../../../zoom-context';

describe('Basic tests', () => {
  it('should do math', () => {
    const x = 1 + 2;
    expect(x).toBe(3);
  });
});

describe('ModalGrid component tests', () => {
  it('should display modal,button, and modalContent', () => {
    const { queryByTestId } = render(
      <ModalGrid variable="test" />,
    );

    expect(queryByTestId('Modal')).toBeTruthy();
    expect(queryByTestId('Button')).toBeTruthy();
    expect(queryByTestId('ModalContent')).toBeTruthy();
    expect(queryByTestId('title').innerHTML).toBe('test');
    expect(queryByTestId('ModalBody')).toBeTruthy();
    expect(queryByTestId('GridContent')).toBeTruthy();

    // shouldn't display icons with no data
    expect(queryByTestId('ModalIcon')).toBeNull();
  });

  it('should display icons when given data', () => {
    const data = {
      ValidKeys: ['AB'],
    };
    const data2 = {
      AB: {
        KeyValue: 'AB', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_FACEPLATE_FINISH_Aged_Brass.jpg', Label: 'Aged Brass', FeatureImage: '',
      },
    };
    const zoomVal = null;
    const setZoom = null;
    render(
      <ZoomRequest.Provider value={{ zoomVal, setZoom }}>
        <ZoomResponse.Provider value={{ zoomVal, setZoom }}>
          <ModalGrid variable="test" zoomResComponentData={data} iconsObj={data2} />
        </ZoomResponse.Provider>
      </ZoomRequest.Provider>
      ,
    );

    expect(screen.getByTestId('ModalIcon')).toBeTruthy();
  });
});
