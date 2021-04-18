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

   const { dropdown_key, cdn, dropdown_value, dropdown_image, dropdown_selected, componentName } = props
	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

   let item

   if (cdn && item) {
		item = `${dropdown_value}`
	} else {
		item = "No item!"
	}
   

   // View that is returned
   // TODO: When a color is selected, only display the coresponding image
   return (
      <Picker>
         <Picker.Item label = {item} value = {item}/>
      </Picker>
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

