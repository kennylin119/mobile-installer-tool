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
            <Picker.Item label = {<Image square style={{width: 30, height: 20, marginTop: 5}} source={{uri: link}}/>}/>
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

