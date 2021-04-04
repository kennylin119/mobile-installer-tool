import React, { useContext } from "react"
import router from "../router/router"
import { Zoom } from "../zoom-context"

/**
 * Main logical layer function that:
 * 1. builds the zoom object
 * 2. sends the zoom object using fetch()
 * 3. handles the response from the configurator
 */
const zoomHandler = (props) => {
	// Destructuring props
	const { key, value } = props

	console.log("[zoomHandler]")

	// Build the zoom object
	let zoom = {}

	// Send the zoom object
	fetch(` https://services.mylutron.com/productservicesorchestrator/v1/zoom`, {
		method: "POST",
		body: JSON.stringify(zoom),
		headers: { "Content-Type": "application.json" },
	})
		.then((response) => {
			// Handle the response
			return response.json()
		})
		.catch((err) => {
			return err
		})
	// ! should we add anything else here?
}

export default zoomHandler
