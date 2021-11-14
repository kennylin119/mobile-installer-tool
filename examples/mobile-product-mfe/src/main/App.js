/* eslint-disable array-callback-return */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// importing the context API
import { Product } from './product-context';
import { ZoomRequest, ZoomResponse } from '../zoom-context';

// importing all the components
import Icons from './component/Icons/Icons';
import NativeDropdown from './component/SelectionList/NativeDropdown';
import ProductImage from './component/ProductImage/ProductImage';
import Exception from './component/Exception/Exception';
import {
  router, fetchUITemplateDPM,
} from './router/router';

// importing routing functions
import ZoomHandler from './services/ZoomHandler';
import SelectionList from './component/SelectionList/SelectionList';
import Header from './component/Header/Header';
import Number from './component/Input/Number';

// importing util functions
import {
  componentMapper, convertArrayToObject, initializeZoom, parseUITemplate,
} from './utils/DataParser';

const StyledButton = styled.div`
	cursor: pointer;
	display: inline-block;
	min-height: 1em;
	vertical-align: baseline;
	background: #e0e1e2 none;
	color: rgba(0, 0, 0, 0.6);
	font-family: "HelveticaNeue Regular", sans-serif;
	margin: 0em 0.25em 0em 0em;
	padding: 0.6em 1em 0.6em;
	font-weight: bold;
	line-height: 1em;
	font-style: normal;
	text-align: center;
	border-radius: 2px;

	&:hover {
		box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
	}
`;

const CancelButton = styled(StyledButton)`
	width: 6rem;
	border: 1px solid #115b67;
	background: #fff;
	color: #115b67;
	position: fixed;
	bottom: 1.5em;
	right: 8.5em;
	&:hover {
		background: rgb(211, 211, 211);
	}
`;

const SaveButton = styled(StyledButton)`
	width: 6rem;
	/* this is the lutron blue */
	background-color: #198294;
	color: #fff;
	position: fixed;
	bottom: 1.5em;
	right: 1.5em;
	&:hover {
		background: rgb(34, 158, 180);
	}
`;

const Application = styled.div`
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
`;

/**
 * handleOnSave takes the user configurations and current zoom values to build out a final object to be passed into lutron's save function
 * @param {*} zoomReqVal
 * @param {*} zoomResVal
 * @param {*} configure The user configuration
 * @param {*} save_function	The save function passed in my lutron's parent container
 */
const handleOnSave = async (product, zoomResVal, zoomReqVal, configure_test, save_function) => {
  console.log('[handleOnSave]');

  const features = {};
  Object.keys(zoomResVal.Features).map((key) => {
    features[key] = zoomResVal.Features[key].CurrentValue;
  });

  if (features.LeadTime) {
    delete features.LeadTime;
  }

  // TODO: need to fill out the rest of these
  const save_payload = {
    Filters: {},
    Product: product.ProductIdentifier,
    RangeFilters: {},
    Selections: features,
    FGID: null,
    LeadTime: {},
    LineItemId: null,
    ListPrice: zoomResVal.Features.LeadTime,
    ListPriceAdjustment: 0,
    LutronSellingCompany: "00101",
    ModelNumber: "NPKP",
    Name: null,
    OverrideDiscountedPrice: null,
    OverrideListPrice: null,
    ProductType: null,
    ProjectDisplayId: null,
    ProjectId: null,
    Quantity: 1,
    RevisionId: null,
    RowVersion: null,
    ShipToNumber: zoomReqVal.ZoomInput.ShipToNumber,
  };

  console.log('final save payload');
  console.log(save_payload);

  // save_function(save_payload);
};

/**
 * handleOnCancel handles when the user clicks on cancel
 */
const handleOnCancel = async () => {
  console.log('[handeOnCancel]');
};

const App = (props) => {
  // Destructuring props
  // data will contain the AUTHORIZATION TOKEN and a save function
  const { save_function } = props;
  // const configure_test = {
  //   BillOfMaterialsLineItemId: 7407192,
  //   ConfiguredJSON:
  // 		'{"Product":"Alisse","Category":null,"Details":null,"IsConfigured":true,"Selections":{"SYSTEM":"HW","WALLBOX_SHAPE":"S","COLUMNS":"2","BUTTON_ARRAY":"33","FACEPLATE_FINISH":"AZ","ENGRAVING_SPECIFIED":"TBD","COUNTRY":"US","COMPONENTS":"KO","IS_DEMO":"N","ProductDetails":"NPKP"},"Filters":null,"AutoSelections":null,"Warnings":["The Alisse keypad requires the use of a Base Unit for installation.  \\"Keypad Only\\" should be selected for replacement keypads where a Base Unit is already present."],"ModelType":null,"ProductType":null,"ResultantValue":{"PSTORE_MODEL":"HW-S-AZ-S-10101-10101-AZ-E"},"SelectionValues":{"SYSTEM":"HomeWorks (QSX)","WALLBOX_SHAPE":"Square Backbox","COLUMNS":"2-Column","BUTTON_ARRAY":"3, 3 Button","FACEPLATE_FINISH":"Aged Bronze","ENGRAVING_SPECIFIED":"TBD","COUNTRY":"United States","COMPONENTS":"Keypad Only","IS_DEMO":"No","ProductDetails":"Keypad","PSTORE_MODEL":"HW-S-AZ-S-10101-10101-AZ-E"},"AutoValues":null}',
  //   AdditionalAttributes: null,
  //   IsFullyConfigured: false,
  //   VolumeDiscountEligiblePanels: null,
  //   ValidationErrorType: 0,
  //   ErroneousFeatures: null,
  //   RowVersion: 'AAAAAAHhvJs=',
  //   OverrideListPrice: null,
  //   OverrideLeadTime: null,
  //   OverrideDiscountedPrice: null,
  //   ListPriceAdjustment: null,
  //   ModelNumber: 'NPKP',
  //   FGID: 'HW-NW-KP-S2-E',
  //   MinLeadTime: 20,
  //   MaxLeadTime: 20,
  //   DiscountedPrice: null,
  //   QuotableTill: null,
  //   MinPrice: 525.0,
  //   MaxPrice: 525.0,
  // };
  // const configure_test = {
  //   AdditionalAttributes: null,
  //   BillOfMaterialsLineItemId: 7878428,
  //   ConfiguredJSON: '{"Product":"Drapery","Category":null,"Details":null,"IsConfigured":true,"Selections":{"WIDTH":"65","TRACKTYPE":"SINGLE","PLEAT":"PP","METALCOLOR":"BZ","CUSTCOLOR":"N","OPRPOS":"L","DRAW":"CD","MOUNT":"C","FULLNESS":"25X","SUBLINEQTY":"0","ISSUBLINE":"N","COUNTRY":"US","SUBLINETRACKTYPE":"SINGLE","BREAKAWAY":"N","SPLICE":"0.0000","ProductDetails":"QSYD4S10STR"},"Filters":null,"AutoSelections":null,"Warnings":["Maximum weight must not exceed 80 lbs"],"ModelType":null,"ProductType":null,"ResultantValue":{"ESTOPEN":"3334","STACKBACK":"833","DRAPEWTMAX":"36","BKTPERTRACK":"14","AUXCARNUM":"54","PLEATSPACING":"89","DRPTRKWIDTHSP":"5001","SNAPNUM":"0","AUXCARNUM2":"0"},"SelectionValues":{"WIDTH":"5001","TRACKTYPE":"Single","PLEAT":"Pinchpleat","METALCOLOR":"Bronze","CUSTCOLOR":"None","OPRPOS":"Left","DRAW":"Center Draw","MOUNT":"Ceiling Mount","FULLNESS":"2.5X - Non-Sheer Pinch Pleat","SUBLINEQTY":"0","ISSUBLINE":"None","COUNTRY":"United States","SUBLINETRACKTYPE":"Single","BREAKAWAY":"No","SPLICE":"None","ProductDetails":"Sivoia QS Wireless D105 Drapery Track","ESTOPEN":"3334","STACKBACK":"833","DRAPEWTMAX":"36","BKTPERTRACK":"14","AUXCARNUM":"54","PLEATSPACING":"89","DRPTRKWIDTHSP":"5001","SNAPNUM":"0","AUXCARNUM2":"0"},"AutoValues":null}',
  //   DiscountedPrice: null,
  //   ErroneousFeatures: null,
  //   FGID: 'QSYD4-S10STR',
  //   IsFullyConfigured: true,
  //   IsLocked: false,
  //   ListPriceAdjustment: null,
  //   MaxLeadTime: 10,
  //   MaxPrice: 2346.74,
  //   MinLeadTime: 10,
  //   MinPrice: 2346.74,
  //   ModelNumber: 'QSYD4-S10STR',
  //   OverrideDiscountedPrice: null,
  //   OverrideLeadTime: null,
  //   OverrideListPrice: null,
  //   QuotableTill: null,
  //   RowVersion: 'AAAAAAIA3Sg=',
  //   ValidationErrorType: 0,
  //   VolumeDiscountEligiblePanels: null,
  // };

  const configure_test = null;

  // Hard coded product name, will be whatever data is
  // Alisse, Drapery, Woodblinds, Finire, Linears
  const PRODUCT_IDENTIFIER = 'ALISSE';

  // State variables for the product
  const [product, setProduct] = useState(null);
  const [DPM, setDPM] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedDPM, setIsLoadedDPM] = useState(false);

  // set up access points for the zoom contexts
  const [zoomReqVal, setZoomReq] = useState(null);
  const [zoomResVal, setZoomRes] = useState(null);

  // UITemplate UserControls converted into a hash map
  const [UserControlsObj, setUserControlsObj] = useState(null);
  const [RenderLayout, setRenderLayout] = useState(null);

  const updateZoomAndRenderLayout = (data) => {
    // can access old zoomResVal
    setZoomRes(data);
    setRenderLayout(parseUITemplate(product, UserControlsObj, data));
  };

  // Life cycle hook to get and save the product on load
  useEffect(() => {
    // Gauranteed way to return a promise
    const getProduct = async () => {
      if (isLoaded && product) {
        console.log('finished');
        return;
      }

      // Getting the data from fetchProduct
      // Handling the response if result or error

      // fetch the UI template and DPM at same time, handle response
      await fetchUITemplateDPM(PRODUCT_IDENTIFIER)
        .then((body) => {
          const promises = body.map((res) => res.json());
          Promise.all(promises)
            .then(
              (data) => {
                setIsLoaded(true);
                setIsLoadedDPM(true);
                setProduct(data[0][0]);
                setDPM(data[1]);
              },
              (promiseError) => {
                setIsLoaded(true);
                setIsLoadedDPM(true);
                setError(promiseError);
              },
            );
        });
    };

    getProduct();
  }, []); // [] data dependency

  // If there was an error
  if (error) {
    console.log('ERROR OCCURED');
    return (
      <div className="container-fetch-error">
        Error:
        {error.message}
      </div>
    );
  }
  // If the product hasn't loaded yet
  if (!isLoaded || !isLoadedDPM) {
    console.log('NOT LOADED YET');
    return <div className="container-loading">Loading...</div>;
  }
  // If the product has been loaded

  // New method using Context API
  if (product && DPM) {
    // We build the context API values before rendering

    // Building input zoom object using UI template and user configurations
    if (zoomReqVal == null) {
      setZoomReq(initializeZoom(product, DPM, configure_test ? configure_test.ConfiguredJSON : null));
    }
    if (zoomReqVal && zoomResVal == null) {
      // Call Zoom Handler which calls configurator API, then we set the response to our zoom response context
      ZoomHandler(zoomReqVal).then((response) => {
        // console.log(response);
        setZoomRes(response); // re-render the page
      });
    }

    if (UserControlsObj == null) {
      console.log('[product]');
      // console.log(product);
      setUserControlsObj(convertArrayToObject(product.UserControls, 'Variable'));
    } else {
      if (zoomResVal) {
        if (RenderLayout == null) {
          setRenderLayout(parseUITemplate(product, UserControlsObj, zoomResVal));
        } else {
          // temporary source, will need to change
          const product_icon = 'https://files-2.mylutron.com/Styles/images/NightParrot.svg?v=3.22.0.0';

          // Render the DOM
          return (
            <Application>
              {/* // Context API, passing the state in */}
              <Product.Provider value={{ product, setProduct }}>
                <ZoomRequest.Provider value={{ zoomReqVal, setZoomReq }}>
                  <ZoomResponse.Provider value={{ zoomResVal, updateZoomAndRenderLayout }}>
                    <Header product_name={PRODUCT_IDENTIFIER} img_src={product_icon} />
                    <div className="container">
                      <div className="row">
                        <div className="col-1" />
                        <div className="col-4">
                          {/* Only Product Image goes in this div */}
                          <ProductImage product={product} />
                        </div>
                        <div className="col-6">
                          {zoomResVal?.Errors.length > 0 && <Exception err={zoomResVal?.Errors} />}
                          {/* Put all other components in this div */}
                          {RenderLayout.map(
                            ({ Variable, RenderType }) => ({
                              Icons: <Icons variable={Variable} data={UserControlsObj[Variable]} cdn={product.CDNPrefix} />,
                              SelectionList: <SelectionList variable={Variable} data={UserControlsObj[Variable]} />,
                              Number: <Number input_name={Variable} data={UserControlsObj[Variable]} convertObject={convertArrayToObject} />,
                              // NativeDropdown: <NativeDropdown variable={Variable} data={UserControlsObj[Variable]} cdn={product.CDNPrefix} />,
                            }[RenderType]),
                          )}
                        </div>
                        <div className="col-1" />
                      </div>
                    </div>
                  </ZoomResponse.Provider>
                </ZoomRequest.Provider>
              </Product.Provider>
              <div id="fixed-buttons" style={{ position: 'fixed', bottom: '2em', right: '2em' }}>
                <div className="fixed-button-background">
                  <CancelButton onClick={() => handleOnCancel()}>Cancel</CancelButton>
                  <SaveButton onClick={() => handleOnSave(product, zoomResVal, zoomReqVal, configure_test, save_function)}>Save</SaveButton>
                </div>
              </div>
            </Application>
          );
        }
      } else {
        return <div>Awaiting from Configurator API...</div>;
      }
    }
  } else {
    return <div className="container-product-error">Cannot load...</div>;
  }
};

export default App;
