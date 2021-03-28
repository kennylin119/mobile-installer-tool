import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = (props) => {
	const {cdn, path} = props;
    const link = cdn+path; 
	return (
		<div> 
            <p>This Is where ProductImage should be</p>
            <img src={link}></img>
        </div>

	)
};

ProductImage.propTypes = {};

export default ProductImage;
