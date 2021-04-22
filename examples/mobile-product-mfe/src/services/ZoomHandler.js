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
	try {
		// Make call to configurator API, passing in the input zoom object
		var response = await fetchZoom(zoom)
		var data = await response.json()
		console.log("[configurator API OK response]")
		return data
	} catch (e) {
		console.log("[configurator API ERR response]")
	}
}

export default ZoomHandler
