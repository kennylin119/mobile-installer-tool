/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
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
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// importing the context API
import { Product } from './product-context';
import { ZoomRequest, ZoomResponse } from './zoom-context';

// importing all the components
import Icons from './component/Icons/Icons';
import NativeDropdown from './component/SelectionList/NativeDropdown';
import ProductImage from './component/ProductImage/ProductImage';
import Exception from './component/Exception/Exception';
import { TestComponent } from './component/Test-Component/TestComponent';
import {
  router, fetchUITemplate, fetchDPM, fetchImage,
} from './router/router'; // Note: fetchProduct is a singleton
// importing routing functions
import ZoomHandler from './services/ZoomHandler';
import SelectionList from './component/SelectionList/SelectionList';
import Header from './component/Header/Header';

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
	bottom: 2.5em;
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
	bottom: 2.5em;
	right: 1.5em;
	&:hover {
		background: rgb(34, 158, 180);
	}
`;

// Maps Lutron componentTypes to our componentTypes
// ! IF YOU CHANGE THE NAME OF YOUR COMPONENT, CHANGE THE NAME ON THE RIGHT HERE
const componentMapper = {
  SelectionList: 'SelectionList',
  //   ImageSelectionList: "NativeDropdown",
  ImageSelectionList: 'Icons',
  ImageSelector: 'Icons',
  ProductImage: 'ProductImage',
  // Engraving: "Engraving",
  MetalColor: 'SelectionList',
  // Number: "Double",			// Figure out what Number should be
  Double: 'Value',
  String: 'Value',
  int: 'Value',
  // Fabric: "Fabric",			// Fabric should be a grouped component that imports SelectionSlider and Icons
  // Grouped: "Grouped",			// TBD
  // HorizontalLine: "HorizontalLine",
  // RowGroup: "RowGroup",
};

const Application = styled.div`
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
`;

/**
 * This function takes in product and configure and parses both objects to build out
 * a zoom object to return.
 *
 * @param {*} uitemplate == UITemplate
 * @param {*} dpm == Default product model
 * @param {*} configure == user configurations
 * @returns == zoom object
 */
const initializeZoom = (uitemplate, dpm, configure) => {
  if (uitemplate && dpm) {
    console.log('[building initial zoom with uitemplate and DPM]');
    console.log(uitemplate);
    console.log(dpm);

    if (configure) {
      configure = JSON.parse(configure);

      console.log('[and user configurations]');
      console.log(configure);
    }

    // Using optional chaining ?.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    // TODO: familiarize with what each of these attributes mean
    // ! Not every zoom variable has all of these attributes. Are there other attributes that we missed?

    const featureDependencies = {};

    if (uitemplate?.UserControls) {
      uitemplate.UserControls.map((obj) => {
        const key = obj?.Variable;

        // Handle the feature dependencies if there are any
        const tempObj = dpm.Features[key];

        if (tempObj) {
          const dependantFeatures = tempObj?.DependentFeatures;

          // If a dependant feature exists
          if (dependantFeatures && dependantFeatures.length > 0) {
            // Map over each dependantFeature
            { dependantFeatures.map((val) => {
              featureDependencies[val] = [key];
            }); }
          }
        }
      });
    }

    return {
      // REQUEST
      ZoomInput: {
        ShipToNumber: 709323, // Lutron account number
        LutronSellingCompany: '00101', // Where country exists
        Product: uitemplate?.ProductIdentifier,
        Selections: configure?.Selections,
        AccessLevels: 1, // Place holder (level 1: full access to all selection options)
      },
      OverrideSelections: configure?.ResultantValue,
      FeatureDependencies: featureDependencies,
      IsQuoted: configure?.IsQuoted,
    };
  }
  console.log('[error with UI-template or DPM]');
};

/**
 * This function takes in product and parses the Layout to produce an an array of objects {Variable, RenderType}
 * @param {*} uitemplate == UITempalate
 */
const parseUITemplate = (uitemplate, UserControlsObj) => {
  console.log('[parseUITemplate]');
  // console.log(UserControlsObj)
  const rows = uitemplate?.Layouts[0]?.Rows;
  const res = [];

  {
    rows.map((obj) => {
      const controls = obj?.Controls[0];
      const controlVar = controls?.Variable;

      // Verify that the obj exists in the initial zoom response value

      res.push({
        Variable: controlVar,
        RenderType: componentMapper[UserControlsObj[controlVar].ControlType],
      });
    });
  }

  return res;
};

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => ({
    ...obj,
    [item[key]]: item,
  }), initialValue);
};

/**
 * handleOnSave takes the user configurations and current zoom values to build out a final object to be passed into lutron's save function
 * @param {*} zoomReqVal
 * @param {*} zoomResVal
 * @param {*} configure The user configuration
 * @param {*} save_function	The save function passed in my lutron's parent container
 */
const handleOnSave = async () => {
  console.log('[handleOnSave]');
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
  const configure_test = {
    BillOfMaterialsLineItemId: 7407192,
    ConfiguredJSON:
  		'{"Product":"Alisse","Category":null,"Details":null,"IsConfigured":true,"Selections":{"SYSTEM":"HW","WALLBOX_SHAPE":"S","COLUMNS":"2","BUTTON_ARRAY":"33","FACEPLATE_FINISH":"AZ","ENGRAVING_SPECIFIED":"TBD","COUNTRY":"US","COMPONENTS":"KO","IS_DEMO":"N","ProductDetails":"NPKP"},"Filters":null,"AutoSelections":null,"Warnings":["The Alisse keypad requires the use of a Base Unit for installation.  \\"Keypad Only\\" should be selected for replacement keypads where a Base Unit is already present."],"ModelType":null,"ProductType":null,"ResultantValue":{"PSTORE_MODEL":"HW-S-AZ-S-10101-10101-AZ-E"},"SelectionValues":{"SYSTEM":"HomeWorks (QSX)","WALLBOX_SHAPE":"Square Backbox","COLUMNS":"2-Column","BUTTON_ARRAY":"3, 3 Button","FACEPLATE_FINISH":"Aged Bronze","ENGRAVING_SPECIFIED":"TBD","COUNTRY":"United States","COMPONENTS":"Keypad Only","IS_DEMO":"No","ProductDetails":"Keypad","PSTORE_MODEL":"HW-S-AZ-S-10101-10101-AZ-E"},"AutoValues":null}',
    AdditionalAttributes: null,
    IsFullyConfigured: false,
    VolumeDiscountEligiblePanels: null,
    ValidationErrorType: 0,
    ErroneousFeatures: null,
    RowVersion: 'AAAAAAHhvJs=',
    OverrideListPrice: null,
    OverrideLeadTime: null,
    OverrideDiscountedPrice: null,
    ListPriceAdjustment: null,
    ModelNumber: 'NPKP',
    FGID: 'HW-NW-KP-S2-E',
    MinLeadTime: 20,
    MaxLeadTime: 20,
    DiscountedPrice: null,
    QuotableTill: null,
    MinPrice: 525.0,
    MaxPrice: 525.0,
  };

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

  // Hard coded product name, will be whatever data is
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

      // fetch the UI template and handle response
      await fetchUITemplate(PRODUCT_IDENTIFIER)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setProduct(result[0]);
          },
          (promiseError) => {
            setIsLoaded(true);
            setError(promiseError);
          },
        );

      // fetch the DPM and handle response
      await fetchDPM(PRODUCT_IDENTIFIER)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoadedDPM(true);
            setDPM(result);
          },
          (promiseError) => {
            setIsLoadedDPM(true);
            setError(promiseError);
          },
        );
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
      setZoomReq(initializeZoom(product, DPM, configure_test.ConfiguredJSON)); // re-render the page
    }
    if (zoomReqVal && zoomResVal == null) {
      // Call Zoom Handler which calls configurator API, then we set the response to our zoom response context
      ZoomHandler(zoomReqVal).then((response) => {
        console.log(response);
        setZoomRes(response); // re-render the page
      });
    }

    if (UserControlsObj == null) {
      console.log('[product]');
      console.log(product);
      setUserControlsObj(convertArrayToObject(product.UserControls, 'Variable'));
    } else {
      // Setup for Render
      if (RenderLayout == null) {
        setRenderLayout(parseUITemplate(product, UserControlsObj));
      } else {
        console.log(RenderLayout);
        console.log(UserControlsObj);

        // temporary source, will need to change
        const product_icon = 'https://files-2.mylutron.com/Styles/images/NightParrot.svg?v=3.22.0.0';

        if (zoomResVal) {
          // Render the DOM
          return (
            <Application>
              {/* // Context API, passing the state in */}
              <Product.Provider value={{ product, setProduct }}>
                <ZoomRequest.Provider value={{ zoomReqVal, setZoomReq }}>
                  <ZoomResponse.Provider value={{ zoomResVal, setZoomRes }}>
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
                <CancelButton onClick={() => handleOnCancel()}>Cancel</CancelButton>
                <SaveButton onClick={() => handleOnSave(zoomResVal, zoomReqVal, configure_test, save_function)}>Save</SaveButton>
              </div>
            </Application>
          );
        }
        return <div>Awaiting from Configurator API...</div>;
      }
    }
  } else {
    return <div className="container-product-error">Cannot load...</div>;
  }
};

export default App;
