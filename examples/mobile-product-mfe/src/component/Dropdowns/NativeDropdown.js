import default_img from '../../toolkit/default_image.jpeg';
import { Product } from "../../product-context";
import React, { useContext } from "react";
import { View, Text, Picker, StyleSheet, Image } from 'react-native';
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";
import NativeDropdownItem from "./NativeDropdownItem";

const NativeDropdown = (props) => {

   // Using props from Context API
   console.log("[Image-Selection-List]")
   const { data, variable } = props

   // Setting the Zoom context
   const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)
   
   // View that is returned
   return (
      <div>
         <h3>{data.Variable}</h3>
         <Picker >
         {data.OptionValues.map((option) => {
            return <NativeDropdownItem label={option.Label} section={variable} keyValue = {option.keyValue} />;
         })}
         </Picker>
		</div>
   )
}

export default NativeDropdown;