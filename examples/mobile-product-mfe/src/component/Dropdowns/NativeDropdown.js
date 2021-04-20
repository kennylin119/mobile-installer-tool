import default_img from '../../toolkit/default_image.jpeg';
import { Product } from "../../product-context";
import React, { useContext } from "react";
import { View, Text, Picker, StyleSheet, Image } from 'react-native'
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

   // Using props from Context API
   console.log("[Image-Selection-List]")
   const { variable, data, cdn } = props

   // Setting the Zoom context
   const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)
   

   // View that is returned
   // TODO: When a color is selected, only display the coresponding image
   return (
      <div>
         <h3>{data.Variable}</h3>
         <Picker >
         {data.OptionValues.map((option) => {
            return <Picker.Item label = {option.Label} value = {option.Label} />
         })}
         </Picker>
		</div>
   )
}

export default NativeDropdown;