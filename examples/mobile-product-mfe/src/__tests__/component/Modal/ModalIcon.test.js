/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import ModalIcon from '../../../main/component/Modal/ModalIcon';
import { ZoomResponse, ZoomRequest } from '../../../zoom-context';

describe('Basic tests', () => {
  it('should do math', () => {
    const x = 1 + 2;
    expect(x).toBe(3);
  });
});

describe('Modal Icon Component tests', () => {
  it('should load image', () => {
    const icon_image = 'toolkit/ALISSE/Toolkit_Definition_Value_Image_FACEPLATE_FINISH_Aged_Brass.jpg';
    const cdn = 'https://FADQAImageAkamaiCDN.azureedge.net/fadqaimages001/';
    const zoomVal = null;
    const setZoom = null;

    render(
      <ZoomRequest.Provider value={{ zoomVal, setZoom }}>
        <ZoomResponse.Provider value={{ zoomVal, setZoom }}>
          <ModalIcon cdn={cdn} icon_image={icon_image} />
        </ZoomResponse.Provider>
      </ZoomRequest.Provider>
      ,
    );
    expect(screen.getByTestId('ModalIconContainer')).toBeTruthy();
    expect(screen.getByTestId('ModalIcon')).toBeTruthy();

    const displayedImage = screen.getByRole('img');

    expect(displayedImage).toHaveAttribute('src', cdn + icon_image);
  });

  it('should not load image', () => {
    const zoomVal = null;
    const setZoom = null;

    render(
      <ZoomRequest.Provider value={{ zoomVal, setZoom }}>
        <ZoomResponse.Provider value={{ zoomVal, setZoom }}>
          <ModalIcon />
        </ZoomResponse.Provider>
      </ZoomRequest.Provider>
      ,
    );
    expect(screen.getByTestId('ModalIconContainer')).toBeTruthy();
    expect(screen.getByTestId('ModalIcon')).toBeTruthy();

    const displayedImage = screen.getByRole('img');

    expect(displayedImage).toHaveAttribute('src', '');
  });
});
