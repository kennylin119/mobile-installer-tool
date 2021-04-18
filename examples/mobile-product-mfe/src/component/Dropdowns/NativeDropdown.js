import default_img from '../../toolkit/default_image.jpeg';
import { Product } from "../../product-context";
import React, { useContext } from "react";
import { View, Text, Picker, StyleSheet, Image } from 'react-native'
import {Container, Row, Col} from 'react-bootstrap/DropdownButton'; 
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

const displaySamples = () => {
   var base_url = "https://FADAkamaiCDN.azureedge.net/filestorage/toolkit/ALISSE/Toolkit_Definition_Value_Image_FACEPLATE_FINISH_";

   // Image color URLs
   const aged_brass_url = base_url + "Aged_Brass.jpg";
   const aged_bronze_url = base_url + "Aged_Bronze.jpg";
   const brushed_brass_url = base_url + "Brushed_Brass.jpg";
   const graphite_url = base_url + "Graphite.jpg";
   const champagne_url = base_url + "Champagne.jpg";
   const satin_nickel_url = base_url + "Satin_Nickel.jpg";
   const bright_chrome_url = base_url + "Bright_Chrome.jpg";
   const brilliant_white_url = base_url + "Brilliant_White.jpg";
   const snow_white = base_url + "Snow_White.jpg";
   const archetectural_white_url = base_url + "Archetectural_White.jpg";
   const matte_black_url = base_url + "Matte_Black.jpg";
   return (
      <View>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: aged_brass_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: aged_bronze_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: brushed_brass_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: graphite_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: champagne_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: satin_nickel_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: bright_chrome_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: brilliant_white_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: snow_white}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2}} source={{uri: archetectural_white_url}}/>
         <Image square style={{width: 30, height: 20, marginTop: 2, marginBottom: 2}} source={{uri: matte_black_url}}/>
      </View>
   )
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
                  <Picker>
                     {list.OptionValues.map((option) => {
                        return <Picker.Item label = {option.Label}/>
                        })}
                  </Picker>
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

