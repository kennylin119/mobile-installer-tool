/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable array-callback-return */

export const componentMapper = {
  SelectionList: 'SelectionList',
  //   ImageSelectionList: "NativeDropdown",
  ImageSelectionList: 'Icons',
  ImageSelector: 'Icons',
  ProductImage: 'ProductImage',
  // Engraving: "Engraving",
  MetalColor: 'SelectionList',
  Number: 'Number',
  double: 'Number',
  // String: 'Number',
  int: 'Number',
  // Fabric: "Fabric",			// Fabric should be a grouped component that imports SelectionSlider and Icons
  // Grouped: "Grouped",
  // HorizontalLine: "HorizontalLine",
  // RowGroup: "RowGroup",
};

export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => ({
    ...obj,
    [item[key]]: item,
  }), initialValue);
};

/**
 * This function takes in product and configure and parses both objects to build out
 * a zoom object to return.
 *
 * @param {*} uitemplate == UITemplate
 * @param {*} dpm == Default product model
 * @param {*} configure == user configurations
 * @returns == zoom object
 */
export const initializeZoom = (uitemplate, dpm, configure) => {
  if (uitemplate && dpm) {
    console.log('[building initial zoom with uitemplate and DPM]');

    if (configure) {
      configure = JSON.parse(configure);
    }

    const featureDependencies = {};

    if (uitemplate?.UserControls) {
      uitemplate.UserControls.map((obj) => {
        const key = obj?.Variable;

        const tempObj = dpm.Features[key];

        // Handle the feature dependencies if there are any
        if (tempObj) {
          const dependantFeatures = tempObj?.DependentFeatures;

          // If a dependant feature exists
          if (dependantFeatures && dependantFeatures.length > 0) {
            // Map over each dependantFeature
            dependantFeatures.map((val) => {
              featureDependencies[val] = [key];
            });
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
        Selections: configure?.Selections ? configure.Selections : { COUNTRY: 'US' },
        AccessLevels: 1, // Place holder (level 1: full access to all selection options)
      },
      OverrideSelections: configure?.ResultantValue ? configure.ResultantValue : { },
      FeatureDependencies: featureDependencies,
      IsQuoted: configure?.IsQuoted ? configure.IsQuoted : false,
    };
  }
  console.log('[error with UI-template or DPM]');
};

/**
 * This function takes in ui-template and initial zoom response and parses the Layout to produce an an array of objects {Variable, RenderType}
 * @param {*} uitemplate == UITempalate
 */
export const parseUITemplate = (uitemplate, UserControlsObj, zoomResVal) => {
  console.log('[Inside parseUITemplate]');

  const outerContainer = uitemplate.LayoutManager[0].Containers;

  const res = [];
  const zoomResValFeatures = zoomResVal.Features;
  const zoomResValAttribs = convertArrayToObject(zoomResVal.AdditionalAttributes, 'Name');

  outerContainer.map((obj) => {
    const container = obj.Containers;
    container.map((containerRow) => {
      containerRow.Rows.map((innerContainer) => {
        const controlVar = innerContainer.Controls[0].Variable;

        if (zoomResValFeatures.hasOwnProperty(controlVar) || zoomResValAttribs.hasOwnProperty(controlVar)) {
          res.push({
            Variable: controlVar,
            RenderType: componentMapper[UserControlsObj[controlVar].ControlType],
          });
        }
      });
    });
  });

  return res;
};
