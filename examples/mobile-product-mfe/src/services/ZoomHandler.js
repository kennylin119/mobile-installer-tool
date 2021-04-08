import React from "react"
import router, { fetchZoom } from "../router/router"

/**
 * Main logical layer function that:
 * 1. builds the zoom object
 * 2. sends the zoom object using fetch()
 * 3. handles the response from the configurator
 * ! For now, we pass in the zoom instead of using the zoom-context in here
 */
const ZoomHandler = (zoom) => {
	console.log("[zoomHandler]")
	// console.log(zoom)

	return fetchZoom(zoom)
		.then((response) => {
			// Handle the response
			console.log("[configurator API OK response]")
			return response.json()
		})
		.then((data) => {
			return data
		})
		.catch((err) => {
			console.log("[configurator API ERR response]")
			return err
		})
}

export default ZoomHandler
