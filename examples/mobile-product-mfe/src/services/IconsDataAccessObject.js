import router from "../router/router"

const IconsDataAccessObject = (props) => {
	// Destructure props
	const {} = props

	return <div>calling IconsDataAccessObject</div>
}

/**
 * Main logical layer function that:
 * 1. builds the zoom object
 * 2. sends the zoom object using fetch()
 * 3. handles the response from the configurator
 */
export const zoomHandler = (props) => {
	// Destructuring props
	const { key, value } = props

	console.log("[zoomHandler]")

	// Build the zoom object
	let zoom = {}

	// Send the zoom object
	fetch(`http://example.com/ALISSE.json`, {
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

export default IconsDataAccessObject
