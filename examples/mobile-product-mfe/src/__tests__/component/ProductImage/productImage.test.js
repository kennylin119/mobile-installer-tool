import { hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback } from 'process';
import { render, screen } from '@testing-library/react';
import ProductImage from '../../../main/component/ProductImage/ProductImage';

const { isMainThread } = require('worker_threads');

describe('productImage component tests', () => {
  it('should math work', () => {
    const x = 45;
    expect(x).toBe(45);
  });

  it('should load ProductImage', () => {

    // let [product, setProduct] = useState(null)

    // //set up access points for the zoom contexts
	    // const [zoomReqVal, setZoomReq] = useState(null)
	    // const [zoomResVal, setZoomRes] = useState(null)

    // const {getByTestId} = render(
    //     <Product.Provider>
    //         <ZoomRequest.Provider>
    //             <ZoomResponse.Provider>

    //                 <ProductImage></ProductImage>
    //             </ZoomResponse.Provider>
    //         </ZoomRequest.Provider>
    //     </Product.Provider>

    // )
  });

  it('should ', () => {

  });
});
