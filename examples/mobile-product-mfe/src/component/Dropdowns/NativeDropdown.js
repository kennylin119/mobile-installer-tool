import default_img from '../../toolkit/default_image.jpeg';
import { Product } from "../../product-context";
import React, { useContext } from "react";
import { View, Text, Picker, StyleSheet, Image } from 'react-native'
import Button from 'react-bootstrap/Button'; 
import { ZoomRequest, ZoomResponse } from "../../zoom-context"
import ZoomHandler from "../../services/ZoomHandler"

class NativeDropdown extends React.Component {

   convertArrayToObject = (array, key) => {
      const initialValue = {}
      return array.reduce((obj, item) => {
         return {
            ...obj,
            [item[key]]: item,
         }
      }, initialValue)
   }

   state = {selection: ''};
   updateSelection = (selection) => {
      this.setState({ selection: selection })
   }

}

NativeDropdown = (props) => {
   
   // Setting the product context
   const product_context = useContext(Product)
	const product = product_context.product

   // Pushing Image Selection List components onto a list structure
   let nativeDropdown = []
	let searchComponent = "ImageSelectionList"
	for (let i = 0; i < product.UserControls.length; i++) {
		if (product.UserControls[i].ControlType === searchComponent) {
			nativeDropdown.push(product.UserControls[i])
		}
	}

   // Setting the Zoom context
   const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)
   

   // View that is returned
   // TODO: When a color is selected, only display the coresponding image
   return (
      <div>
			{nativeDropdown.map((list) => {
				return (
					<div>
						<h3>{list.Variable}</h3>
                  <Picker >
                     {list.OptionValues.map((option) => {
                        return <Picker.Item label = {option.Label} value = {option.Label} />
                        })}
                  </Picker>
                  <Button variant="secondary" size="sm">
                     Color Samples
                  </Button>
					</div>
				)
			})}
		</div>
   )
}

export default NativeDropdown;

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})

