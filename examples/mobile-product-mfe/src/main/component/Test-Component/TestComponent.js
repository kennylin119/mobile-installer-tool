/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { Product } from '../../product-context';

const TestComponent = () => {
  console.log('[TestComponent]');

  return (
    <Product.Consumer>
      {({ product, updateProduct }) => {
        console.log('[Inside TestComponent Consumer]');
        console.log(product);

        updateProduct();
      }}
    </Product.Consumer>
  );
};

export default TestComponent;
