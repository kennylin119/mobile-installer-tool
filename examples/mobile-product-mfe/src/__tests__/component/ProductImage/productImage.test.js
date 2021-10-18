/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
import { hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback } from 'process';
import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import ProductImage from '../../../main/component/ProductImage/ProductImage';
import { ZoomResponse } from '../../../zoom-context';

const { isMainThread } = require('worker_threads');

describe('Basic tests', () => {
  it('should have variables work', () => {
    const x = 45;
    expect(x).toBe(45);
  });

  it('should have 1+2=3', () => {
    const x = 1 + 2;
    expect(x).toBe(3);
  });
});

describe('productImage component tests', () => {
  it('should load correct ProductImage', () => {
    // set up product
    const product = { CDNPrefix: 'https://FADQAImageAkamaiCDN.azureedge.net/fadqaimages001/' };

    // set up zoomResVal
    const zoomResVal = {
      AdditionalAttributes: [
        {
          Name: 'PSTORE_MODEL',
          Value: 'HW-S-AZ-S-01010-01010-AZ-E',
        }],
    };

    const { queryByTestId } = render(
      <ZoomResponse.Provider value={{ zoomResVal }}>
        <ProductImage product={product} />
      </ZoomResponse.Provider>,

    );

    const displayedImage = screen.getByRole('img');

    expect(displayedImage).toHaveAttribute('src', 'https://FADQAImageAkamaiCDN.azureedge.net/fadqaimages001/toolkit/ALISSE/Toolkit_Definition_Value_Image_PSTORE_MODEL_HW-S-AZ-S-01010-01010-AZ-E.png');
    expect(queryByTestId('prodImage')).toBeTruthy();
  });

  it('should not load when zoom hasn\'t loaded', () => {
    // set up product
    const product = { CDNPrefix: 'https://FADQAImageAkamaiCDN.azureedge.net/fadqaimages001/' };

    // set up zoomResVal
    const zoomResVal = null;

    const { queryByTestId } = render(
      <ZoomResponse.Provider value={{ zoomResVal }}>
        <ProductImage product={product} />
      </ZoomResponse.Provider>,

    );

    expect(queryByTestId('prodImage')).toBeNull();
  });
});
