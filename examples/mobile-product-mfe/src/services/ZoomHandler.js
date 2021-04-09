import React from "react"
import router, { fetchZoom } from "../router/router"

/**
 * Main logical layer function that:
 * 1. builds the zoom object
 * 2. sends the zoom object using fetch()
 * 3. handles the response from the configurator
 * ! For now, we pass in the zoom instead of using the zoom-context in here
 */
const ZoomHandler = async (zoom) => {
	console.log("[zoomHandler]")
	// console.log(zoom)
	try{
		var response = await fetchZoom(zoom);
		var data = await response.json();
		return data;
	} catch(e){
		console.log("[configurator API ERR response]")
	}
	

		// .then((response) => {
		// 	// Handle the response
		// 	console.log("[configurator API OK response]")
		// 	return response.json()
		// })
		// .then((data) => {
		// 	return data
		// })
		// .catch((err) => {
		// 	console.log("[configurator API ERR response]")
		// 	return err
		// })
}

export default ZoomHandler
