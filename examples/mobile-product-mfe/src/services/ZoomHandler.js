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
	console.log(zoom)

	fetchZoom(zoom)
		.then((response) => {
			// Handle the response
			console.log("[configurator API OK response]")
			return response.json()
		})
		.then((data) => {
			console.log(data)
			return data
		})
		.catch((err) => {
			console.log("[configurator API ERR response]")
			console.log(err)
			return err
		})

	// Send the zoom object
	// fetch(`https://services.mylutron.com/productservicesorchestrator/v1/zoom`, {
	// 	method: "POST",
	// 	body: JSON.stringify(zoom),
	// 	headers: { "Content-Type": "application.json" },
	// })
	// 	.then((response) => {
	// 		// Handle the response
	// 		console.log("[configurator API OK response]")
	// 		console.log(response)
	// 		return response.json()
	// 	})
	// 	.catch((err) => {
	// 		console.log("[configurator API ERR response]")
	// 		console.log(err)
	// 		return err
	// 	})

	// ! Should we updateZoom here?
}

export default ZoomHandler
