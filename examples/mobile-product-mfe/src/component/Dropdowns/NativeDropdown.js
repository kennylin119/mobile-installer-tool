import default_img from '../../toolkit/default_image.jpeg';
import { Product } from "../../product-context";
import React, { useContext } from "react";
import { View, Text, Picker, StyleSheet, Image } from 'react-native'

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

   // Info to render the images
   const context = useContext(Product)
   const product = context.product
   const cdn = product.CDNPrefix
   const path = "toolkit/ALISSE/Toolkit_Definition_Value_Image_PSTORE_MODEL_HW-S-AB-S-00100-AB.png"
   const link = cdn + path

   // View that is returned
   // XXX: Picker.Item param "label" only accepts Strings, so image cannot be rendered
   return (
      <View>
         <Image square style={{width: 30, height: 20, marginTop: 5}} source={{uri: link}}/>
         <Picker>
            <Picker.Item label = "Aged Brass" value = "Aged Brass"/>
            <Picker.Item label = "Aged Bronze" value = "Aged Bronze"/>
            <Picker.Item label = "Brushed Brass" value = "Brushed Brass"/>
            <Picker.Item label = "Graphite" value = "Graphite"/>
            <Picker.Item label = "Champagne" value = "Champagne"/>
            <Picker.Item label = "Satin Nickel" value = "Satin Nickel"/>
            <Picker.Item label = "Bright Chrome" value = "Bright Chrome"/>
            <Picker.Item label = "Brilliant White" value = "Brilliant White"/>
            <Picker.Item label = "Snow White" value = "Snow White"/>
            <Picker.Item label = "Architectural White" value = "Architectural White"/>
            <Picker.Item label = "Matte Black" value = "Matte Black"/>
         </Picker>

      </View>
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

