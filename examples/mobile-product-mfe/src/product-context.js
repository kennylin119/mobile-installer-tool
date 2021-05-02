/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React from 'react';
// This is the main state of the entire MFE
// All the parameters of Product will be defined in App.js
export const Product = React.createContext({
  product: null,
  updateProduct: () => {},
});
